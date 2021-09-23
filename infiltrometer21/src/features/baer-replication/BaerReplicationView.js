//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectReading } from './bear-replicationSlice';
import {addReading} from '../reports/reportsSlice';
import { selectTimeInterval } from '../baer-initialize/bear-initializeSlice';
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import "./timer.css";

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



  const initializeState = {
    timerIsPlaying: true,
    key: 0
  };

  const [state, setState] = useState(initializeState);


  //Gets the current reading in the baer-replicationSlice
  const reading = useSelector(selectReading);
  const timeInterval = useSelector(selectTimeInterval);
  const dispatch = useDispatch();

  //use to set the key variable
  const setKey = (key) => setState({...state, key});
  //use to set the timer is playing variable
  const setPlaying = (playing)=>setState({...state, timerIsPlaying:playing});

  
  return (
      <div>
        <div className="timer-wrapper">
          <CountdownCircleTimer
              key={state.key}
              isPlaying = {state.timerIsPlaying}
              duration={Number(timeInterval)}
              colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
          <div className="button-wrapper">
              <button onClick={() => setKey(prevKey => prevKey + 1)}>
                  Restart Timer
              </button>
          </div>
        <div>
          <button onClick={()=>dispatch(addReading(reading))}>
            Add Reading
          </button>
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