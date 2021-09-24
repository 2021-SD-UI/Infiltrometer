//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setVolume, setSecondsElapsed, selectLastVolume, setLastVolume } from './bear-replicationSlice';
import {addReading} from '../reports/reportsSlice';
import { selectTimeInterval, selectInitialVolume } from '../baer-initialize/bear-initializeSlice';
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import "./timer.css";
import _default from 'react-overlays/esm/Modal';
import { useEffect } from 'react';

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

  //use to set the key variable
  const setKey = (key) => setState({...state, key});
  //use to set the timer is playing variable
  const setPlaying = (playing)=>setState({...state, timerIsPlaying:playing});
 

  // This function will be called when the timer reaches zero.
  function getVolumeReading() {
      let volumeReading = Number(prompt("Enter volumetric data below.",0));

      // Notify user of invalid input if volume reading is greater than last volume or is negative.
      
      while (volumeReading > maxVolume
         || volumeReading < 0 || volumeReading == null) {
          window.confirm("Invalid input! Make sure your volume reading is less than or equal to: " + maxVolume );
          volumeReading = Number(prompt("Enter volumetric data below.",0));
      }
      // TODO: Record data to report

          //TODO: set the volume in the replication store
          dispatch(setLastVolume(volumeReading));

          dispatch(setVolume(volumeReading));
          dispatch(setSecondsElapsed(0));
          dispatch(addReading({volume: volumeReading, secondsElapsed: 0}));
          setKey(state.key + 1);
      
  }

  return (
      <div>
        <div className="timer-wrapper">
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
          <div>
            Last Volume: {maxVolume}
          </div>
        <div>
           <button onClick={()=>setPlaying(!state.timerIsPlaying)}>
            Toggle Timer
          </button>
        Bear Replication View
        </div>
        <Link to ="/Infiltrometer/baer-results">To Results View</Link>
      </div>);
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<BaerReplicationView />, rootElement);
export default BaerReplicationView;