//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReport } from '../reports/reportsSlice';
import {Protocols} from '../reports/protocols'
import { selectInitialVolume, selectInfiltrometerData,
  selectInfiltrometerRadius, selectInfiltrometerSuction } from './bear-initializeSlice';
import { Redirect } from 'react-router';

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
    <label for="inputVolume" class="col-sm-2 col-form-label">Initial Volume</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputVolume" placeholder="Enter Volume"/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputSuction" class="col-sm-2 col-form-label">Suction</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputSuction" placeholder="Enter Suction"/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputTimeInterval" class="col-sm-2 col-form-label">Time Interval</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputTimeInterval" placeholder="Enter Time Interval"/>
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


  </div>
     );
}
export default BaerInitializeView;