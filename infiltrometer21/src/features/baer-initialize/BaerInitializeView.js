//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReport } from '../reports/reportsSlice';
import {Protocols} from '../reports/protocols'
import { selectInitialVolume, selectInfiltrometerData,
  selectInfiltrometerRadius, selectInfiltrometerSuction,
setInitialVolume,
setInfiltrometerSuction, setTimeInterval, selectTimeInterval} from './bear-initializeSlice';
import { Redirect } from 'react-router';
import { useEffect } from 'react';




const BaerInitializeView = () => {
  

  const initailState = {
    validated: false,
    redirect: false
  };

  const [state, setState] = useState(false);

  /**
   * Goes to baer replication page when we set the redirect
   * flag to true
   * @returns 
   */
  const Redirector = () =>{
    return state.redirect ? <Redirect to ="/Infiltrometer/baer-replication"/> : null;
  }

  const infiltrometerData = useSelector(selectInfiltrometerData);
  const dispatch = useDispatch();
  /**
   * Adds a new Baer prototocol report using the reports slice
   */
  const generateNewBaerReport=()=>{

    //TODO: validate the input
    setState({...state,
      validated: true});



    //dispatch the new report with valid input
    dispatch(newReport({
     
      protocol: Protocols.Baer,
      //new Date() initializes to the current Date
      date: (new Date()).toString(),    
      infiltrometerData: infiltrometerData
    })
    );


      //set our redirect flag to true
      setState({...state,redirect: true});
    
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



  return (
  <div>
  <div>
    <h1>
      Initialize Baer Protocol
    </h1>
      <Link to ="/Infiltrometer/baer-replication">To Replication View</Link>
    </div>
        <div>

    </div>

  <div class="form-group row">
    <label for="inputVolume" class="col-sm-2 col-form-label" >Initial Volume</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputVolume" onChange = {
        
        //set the initial volume in redux when the text changes

        (evt)=>dispatch(setInitialVolume(evt.target.value))
        
        } placeholder="Enter Volume"/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputSuction" class="col-sm-2 col-form-label">Suction</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputSuction"  onChange = {
        
        //set the suction in redux when the text changes

        (evt)=>dispatch(setInfiltrometerSuction(evt.target.value))
        
        } placeholder="Enter Suction"/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputTimeInterval" class="col-sm-2 col-form-label" >Time Interval</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputTimeInterval" placeholder="Enter Time Interval" onChange = {
        
        //set the suction in redux when the text changes

        (text)=>dispatch(setTimeInterval(text.target.value))
        
        }/>
    </div>
  </div>
  
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Soil Type</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="clayRadio" value="option1" checked/>
          <label class="form-check-label" for="clayRadio">
            Clay
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="loamRadio" value="option2"/>
          <label class="form-check-label" for="loamRadio">
            Loam
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="clayLoamRadio" value="option3"/>
          <label class="form-check-label" for="clayLoamRadio">
            Clay Loam
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="customRadio" value="option4"/>
          <label class="form-check-label" for="customRadio">
            Custom
          </label>
        </div>
      </div>
    </div>
  </fieldset>
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary" onClick = {generateNewBaerReport}>Start Protocol</button>
    </div>
  </div>
    <Redirector/>
  </div>
     );
}
export default BaerInitializeView;