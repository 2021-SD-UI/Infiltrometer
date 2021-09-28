//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReading, newReport } from '../../reports/reportsSlice';
import {Protocols} from '../../reports/protocols'
import { selectInitialVolume, selectInfiltrometerData,
  selectInfiltrometerRadius, selectInfiltrometerSuction,
setInitialVolume,
setInfiltrometerSuction, setTimeInterval, selectTimeInterval,setSoilType,selectSoilType, setInfiltrometerData} from './bear-initializeSlice';
import { Redirect } from 'react-router';
import { useEffect } from 'react';
import { setLastVolume, setSecondsElapsed } from '../baer-replication/bear-replicationSlice';
import { soilTypes } from '../../../app/soilTypes';
import {Field, formValueSelector, reduxForm} from 'redux-form'
import { connect } from 'react-redux';
import { setPage } from '../../page-redirection/redirector-slice';



const renderField = ({ input, label, type, meta: { touched, error} }) => (
  <div>
    
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
)

const validate = values => {
  const errors = {}
  if (!values.volume) {
    errors.volume = 'Required'
  } else if (values.volume < 0) {
    errors.volume = 'Must be a value greater than zero'
  }


  if (!values.suction) {
    errors.suction = 'Required'
  } else if (Number(values.suction) >= 0) {
    errors.suction = 'Must be a negative value'
  }


  if (!values.timeInterval) {
    errors.timeInterval = 'Required'
  } else if (Number(values.timeInterval) <= 0) {
    errors.timeInterval = 'Time interval must be greater than 0'
  }

  if (!values.radius) {
    errors.radius = "Required"
  } else if (Number(values.radius) <= 0) { 
    errors.radius = 'Radius must be larger than 0'
  }

  if (!values.nh0){
    errors.nh0 = "Required"
  }
  else if (Number(values.nh0) < 0){
    errors.nh0 = 'Must be a positive number'
  }
   if (!values.alpha){
    errors.alpha = "Required"
  }
  else if (Number(values.alpha) < 0){
    errors.alpha = 'Must be a positive number'
  }

  return errors
}




const BaerInitializeView = (props) => {
  const infiltrometerData = useSelector(selectInfiltrometerData);
  const { change, soilTypeSelected, handleSubmit, pristine, reset, submitting, soilValues } = props
  

  //current soil type in the store
  const curSoilType = useSelector(selectSoilType);
  
  

  const dispatch = useDispatch();
  /**
   * Adds a new Baer prototocol report using the reports slice
   * 
   */

  const handleFormChange = (event, value) => {

    switch (value) {
      case "clay":
        change("nh0",soilTypes.clay.nh0);
        change("alpha",soilTypes.clay.alpha);
        break;
      case "loam":
        change("nh0",soilTypes.loam.nh0);
        change("alpha",soilTypes.loam.alpha);
        break;
      case "clayLoam":
        change("nh0",soilTypes.clayLoam.nh0);
        change("alpha",soilTypes.clayLoam.alpha);
        break;
      case "miniDisk":
        change("radius",2.25);
        break;
      case "miniDiskV1":
        change("radius", 1.6);
        break;
      case "customType":
        change("radius");
        break;
      default:
        break;
        
    }
    
  }




  return (
    
  <div class = "col-sm-10">
  
        
  <div class="container">



  <form onSubmit = {handleSubmit}>
    <div class="form-group row">
      <label for="volume" class="col-sm-2 col-form-label" >Initial Volume</label>
      <div class="col-sm-10">
        <Field name="volume" type ="number" component={renderField} label="Initial Volume"/>
      </div>
    </div>

    <div class="form-group row">
      <label for="suction" class="col-sm-2 col-form-label" >Suction</label>
      <div class="col-sm-10">
      <Field name="suction" type="number" component={renderField} label="Suction"/>
      </div>
    </div>

    <div class="form-group row">
      <label for="timeInterval" class="col-sm-2 col-form-label" >Time Interval</label>
      <div class="col-sm-10">
      <Field name="timeInterval" type="number" component={renderField} label="Time Interval"/>
      </div>
    </div>

    <div class="form-group row">
      <label for="radius" class="col-sm-2 col-form-label" >Radius</label>
      <div class = "form-group col-sm-10">
        <div class="form-group row">
      <div class="col-sm-10">
      <Field name="infiltrometerType" component="select" onChange={handleFormChange}>
        <option value="customType" selected>Infiltrometer Type</option>
        <option value="miniDisk">MiniDisk</option>
        <option value="miniDiskV1">MiniDiskV1</option>
      </Field>
      </div>
      <Field name="radius" type="number" component={renderField} label="Radius"/>
      </div>
      </div>

    </div>

    <div class="row">
      <label for="soilType" class="col-sm-2 col-form-label" >Soil Type</label>
     
    <div class="col-sm-10">

        <div class="form-group row">
          <div class="col-sm-10">
          <Field name="soilType" component="select" onChange={handleFormChange}>
            <option selected>Preset Soil Types</option>
            <option value="clay">Clay</option>
            <option value="loam">Loam</option>
            <option value="clayLoam">Clay Loam</option>
          </Field>
          </div>
          <div class="form-group col-sm-10">
          <Field name="nh0" component={renderField} type="number" value="nh0" label="NH0"/>
          </div>
          <div class="form-group col-sm-10">
          <Field name="alpha" component={renderField} type="number" value="alpha" label="Alpha"/>
          </div>
          

        </div>

    </div>
    </div>

    
  
     <div class="form-group row col-sm-4">
      <button type="submit" class="btn btn-primary" disabled={submitting}>Start Protocol</button>
      </div>
      <div class="form-group row col-sm-4">
      <button type="button" class="btn btn-secondary" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
    </div>
  </form>

    </div>
  </div>
     );
}
const onSubmit = (values, dispatch) => {

let soilType = soilTypes.default;
switch (values.soilType) {
    case "clay":
      soilType = soilTypes.clay;
      break;
    case "clayLoam":
       soilType = soilTypes.clayLoam;
      break;
    case "loam":
       soilType = soilTypes.loam;
      break;
    default:
      break;
  }
  
  let infiltrometerData = {
     initialVolume: Number(values.volume),
        
              coordinates: {
                lat:0,
                long: 0,
                },
                soilType,
                infiltrometerRadius: values.radius,       
                timeInterval: Number(values.timeInterval),
                infiltrometerSuction: Number(values.suction),
  }
  //set the infitrometer data in the store
  dispatch(setInfiltrometerData(infiltrometerData));
  //set the last volume to the initial volume for the replication view
  dispatch(setLastVolume(infiltrometerData.initialVolume));
  //send out the new report to the store
  dispatch(newReport(  {
            date: (new Date()).toString(),
            protocol: Protocols.Baer,
            infiltrometerData
  }));

  //add the intial reading
  dispatch(addReading({
    volume: Number(values.volume),
    secondsElapsed: 0
  }));

  //change the page
  dispatch(setPage("/Infiltrometer/baer-replication"));
}
const formSelector = formValueSelector('baerInitializeForm')


export default connect(
  state=> {
    const soilTypeSelected =  formSelector(state, 'SoilTypes')
    return {
      soilTypeSelected
    }
  }
)(reduxForm({
  form: 'baerInitializeForm',
  validate,
  onSubmit

})(BaerInitializeView));