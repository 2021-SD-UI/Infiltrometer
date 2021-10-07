//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setVolume, setSecondsElapsed, selectLastVolume, setLastVolume } from './bear-replicationSlice';
import reportsSlice, {addReading, selectCurId, selectReports, selectCurReadingID, setGatheringData} from '../../reports/reportsSlice';
import { selectTimeInterval, selectInitialVolume, setSoilType, selectSoilType } from '../baer-initialize/bear-initializeSlice';
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import "./timer.css";
import _default from 'react-overlays/esm/Modal';
import { useEffect } from 'react';
import { setPage } from '../../page-redirection/redirector-slice';
import  Table  from '../baer-results/table';

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Time is up!</div>;
  }
  return (
      <div className="timer">
        <div className="text">Time remaining:</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
  );
};

const BaerReplicationView = () => {

  //Gets the current reading in the baer-replicationSlice
  const timeInterval = useSelector(selectTimeInterval);
  const initialVolume = Number(useSelector(selectInitialVolume));
  const lastVolume = Number(useSelector(selectLastVolume));

  //the max allowed volume
  const maxVolume = Math.min(initialVolume, lastVolume);
  const dispatch = useDispatch();

  const initializeState = {
    timerIsPlaying: false,
    key: 0,
  };

  const [state, setState] = useState(initializeState);

  //use to set the timer is playing variable
  const setPlaying = (playing)=>setState({...state, timerIsPlaying:playing});
  const curID = useSelector(selectCurReadingID);

  function endProtocol(){

    //mark that we are done gathering data on this report
    dispatch(setGatheringData(false));


    //go to the results page
    dispatch(setPage("/Infiltrometer/baer-results"))
  }

  // This function will be called when the timer reaches zero.
  function getVolumeReading() {

      //stop the timer from running
      setPlaying(false);

      let volumeReading = prompt("Enter volumetric data below.");
      let validated = false;

      // Validate user input -------------------------------------------------------------------------
      while(validated == false) {
          // If user hits the cancel button
          if (volumeReading == null)
              return;
          // Volume reading should be a non-negative number that is less than previous/initial volume.
          else if (volumeReading > maxVolume || volumeReading < 0 || isNaN(parseFloat(volumeReading))) {
              window.confirm("Invalid input! Make sure your volume reading is a number less than or equal to: " + maxVolume);
              volumeReading = prompt("Enter volumetric data below.");
          }
          else
              validated = true;
      }
      // ---------------------------------------------------------------------------------------------

      //calculate the total number of elapsed seconds
      let secondsElapsed = (curID + 1) * timeInterval;
      
      //set the volume and time in the replication store
      dispatch(setLastVolume(volumeReading));
      dispatch(setVolume(volumeReading));
      dispatch(setSecondsElapsed(secondsElapsed));
      
      //add the reading using the reports slice
      dispatch(addReading({volume: volumeReading, secondsElapsed}));
  }

  return (
       
      <div class="container-fluid">
        <div class = "container row">
            <div class = "row mt-5"/>
            <div class="display-4 text-center w-100">
              Current Replication: {curID}
            </div>
            <div class = "row mt-5"/>
        </div>
          
        <div class="row-12">
            
          <div class="col-4"/>
          <div class ="timer-wrapper">
            <CountdownCircleTimer
                key={state.key}
                isPlaying = {state.timerIsPlaying}
                duration={Number(timeInterval)}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                onComplete={() => getVolumeReading()}
              >
                {renderTime}
            </CountdownCircleTimer>
          </div>
          <div class="col-4"/>
        </div>

        <div class = "container">
          <div class = "row mt-4"/>
          <div class = "row-8 text-center">
            <div class="btn btn-dark w-50"
              disabled={state.timerIsPlaying}
              onClick = {()=>{
              setState({
                timerIsPlaying: true,
                key: state.key+1}
                );
                }}> {
                  !state.timerIsPlaying? "Start Replication" : "Replication Running..." 
                    }
            </div>
          </div>
          <div class = "row mt-2"/>
          <div class = "row-8 text-center">
            <div class="btn btn-secondary w-50" onClick = {endProtocol}>
              End Protocol
            </div>
          </div>
          <div class = "row mt-2"/>
        </div>

          <div class ="container">
            <div class="row-4">
              <div class = "row mt-4"/>
                <Table  class="col-8"/>
              <div class = "row mt-4"/>
            </div>
          </div>

            
         <div class = "col-10"/>
      </div>);

}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<BaerReplicationView />, rootElement);
export default BaerReplicationView;