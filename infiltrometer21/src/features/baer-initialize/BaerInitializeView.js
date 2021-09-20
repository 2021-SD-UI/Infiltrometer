//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReport } from '../reports/reportsSlice';
import {Protocols} from '../reports/protocols'
import { selectInitialVolume, selectInfiltrometerData,
  
  selectInfiltrometerRadius, selectInfiltrometerSuction } from './bear-initializeSlice';
const BaerInitializeView = () => {

  const dispatch = useDispatch();


  /**
   * Adds a new Baer prototocol report using the reports slice
   */
  const generateNewBaerReport=()=>{


    dispatch(newReport({
     
      protocol: Protocols.Baer,
      //new Date() initializes to the current Date
      date: (new Date()).toString(),
     
      infiltrometerData: 0
    })
    
    );
  }
  /**Makes sure the current initial volume in the store is valid
   * @returns true if valid, false if not valid
   * @param {\The volume to check for validation} volume 
   */
  function ValidateInitialVolume(){
      let volume = useSelector(selectInitialVolume);
      return (volume > 0);
  }
  /**
   * @returns true if valid, false if not valid
   * @param {the infitrometerType to check for validation} infiltrometerType 
   */
  function ValidateInfiltromterType(infiltrometerType){

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