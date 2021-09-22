//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectReading } from './bear-replicationSlice';
import {addReading} from '../reports/reportsSlice';
import { selectTimeInterval } from '../baer-initialize/bear-initializeSlice';

const BaerReplicationView = () => {

  //Gets the current reading in the baer-replicationSlice
  const reading = useSelector(selectReading);
  const timeInterval = useSelector(selectTimeInterval);
  const dispatch = useDispatch();


  return (<div>
    <div>
      <button onClick={()=>dispatch(addReading(reading))}>
        Add Reading
      </button>
      <button onClick={()=>{
        
        console.log(timeInterval);

      }}>
        Log Time Interval
      </button>
      Bear Replication View
    </div>
      <Link to ="/Infiltrometer/baer-results">To Results View</Link>
    
    </div>);
}
export default BaerReplicationView;