//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { newReport } from '../reports/reportsSlice';
import {Protocols} from '../reports/protocols'
const BaerInitializeView = () => {

  const dispatch = useDispatch();


  //adds a new Baer report using the reports slice
  const generateNewBaerReport=()=>{
    dispatch(newReport({
      protocol: Protocols.Baer,
      date: (new Date()).toString(),
      infiltrometerType: {}
    }));
  }


  return (<div>
    <button onClick = {generateNewBaerReport}>
      Add new Baer Report
    </button>
    <div>
      Bear Initialize View
    </div>
      <Link to ="/Infiltrometer/baer-replication">To Replication View</Link>
      
    </div>);
}
export default BaerInitializeView;