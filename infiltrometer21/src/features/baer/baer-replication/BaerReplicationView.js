//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setVolume, setSecondsElapsed, selectLastVolume, setLastVolume } from './bear-replicationSlice';
import reportsSlice, {addReading, selectCurId, selectReports, selectCurReadingID} from '../../reports/reportsSlice';
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

    //go to the results page
    dispatch(setPage("/Infiltrometer/baer-results"))
  }
  // This function will be called when the timer reaches zero.
  function getVolumeReading() {

      //stop the timer from running
      setPlaying(false);

      let volumeReading = prompt("Enter volumetric data below.");

      //don't record if cancel was pressed
      if (volumeReading == null) return;
      // Notify user of invalid input if volume reading is greater than last volume or is negative.
      while (volumeReading > maxVolume
         || volumeReading < 0 /*|| !isNumber(volumeReading)*/) {
          window.confirm("Invalid input! Make sure your volume reading is a number less than or equal to: " + maxVolume );
          volumeReading = prompt("Enter volumetric data below.");
          //don't record if cancel was pressed
          if (volumeReading == null) return;
      }

      if (volumeReading != null){
          volumeReading = Number(volumeReading);
          if (volumeReading === NaN) return;
        //calculate the total number of elapsed seconds
        let secondsElapsed = (curID + 1) * timeInterval;
      
        //set the volume and time in the replication store
        dispatch(setLastVolume(volumeReading));
        dispatch(setVolume(volumeReading));
        dispatch(setSecondsElapsed(secondsElapsed));
      
        //add the reading using the reports slice
        dispatch(addReading(
            
            {volume: volumeReading, secondsElapsed}      
        ));
      }
  }
  function isNumber(value){
    return typeof value === 'number' && isFinite(value);
  }
  return (
      <div class="container-fluid">
                  <h1 class="container-fluid row">
            Current Replication: {curID}
          </h1>
        <div class = "container-fluid timer-wrapper">
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

        <div class="container-fluid">
          <div class="row container-fluid">
             <button type="submit" class="btn btn-primary" disabled={state.timerIsPlaying} onClick = {()=>{
              setState({
                timerIsPlaying: true,
                key: state.key+1}
                );

             }}>{
            
            !state.timerIsPlaying? "Start Replication" : "Replication Running..."
            
            }</button>
            <button type="submit" class="btn btn-secondary" onClick = {endProtocol}>
              End Protocol
            </button>
          </div>
           
        </div>
         <div class="container-fluid">
        <Table/>
        </div>
      </div>);


}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<BaerReplicationView />, rootElement);
export default BaerReplicationView;