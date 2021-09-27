//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReading, newReport } from '../reports/reportsSlice';
import {Protocols} from '../reports/protocols'
import { selectInitialVolume, selectInfiltrometerData,
  selectInfiltrometerRadius, selectInfiltrometerSuction,
setInitialVolume,
setInfiltrometerSuction, setTimeInterval, selectTimeInterval,setSoilType,selectSoilType, setInfiltrometerData} from './bear-initializeSlice';
import { Redirect } from 'react-router';
import { useEffect } from 'react';
import { setLastVolume, setSecondsElapsed } from '../baer-replication/bear-replicationSlice';
import { soilTypes } from '../../app/soilTypes';
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux';
import { setPage } from '../page-redirection/redirector-slice';



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
  } else if (Number(values.suction) <= 0) {
    errors.suction = 'Must be a positive value'
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
  return errors
}




const BaerInitializeView = (props) => {
  const infiltrometerData = useSelector(selectInfiltrometerData);
  const { handleSubmit, pristine, reset, submitting } = props
  

  //current soil type in the store
  const curSoilType = useSelector(selectSoilType);
  
  

  const dispatch = useDispatch();
  /**
   * Adds a new Baer prototocol report using the reports slice
   */




  return (
  <div class = "col-sm">
  <div>
    <h1>
      Initialize Baer Protocol
    </h1>
      <Link to ="/Infiltrometer/baer-replication">To Replication View</Link>
    </div>
        <div>

    </div>
  <div class="container">



  <form onSubmit = {handleSubmit}>
    <div class="fo,r-group row">
      <label for="volume" class="col-sm-2 col-form-label" >Initial Volume</label>
      <div class="col-sm-10">
        <Field name="volume" type ="number" component={renderField} label="Initial Volume"/>
      </div>
    </div>

    <div class="for-group row">
      <label for="suction" class="col-sm-2 col-form-label" >Suction</label>
      <div class="col-sm-10">
      <Field name="suction" type="number" component={renderField} label="Suction"/>
      </div>
    </div>

    <div class="for-group row">
      <label for="timeInterval" class="col-sm-2 col-form-label" >Time Interval</label>
      <div class="col-sm-10">
      <Field name="timeInterval" type="number" component={renderField} label="Time Interval"/>
      </div>
    </div>

    <div class="for-group row">
      <label for="radius" class="col-sm-2 col-form-label" >Radius</label>
      <div class="col-sm-10">
      <Field name="radius" type="number" component={renderField} label="Radius"/>
      </div>
    </div>

    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Soil Type</legend>
      <div class="col-sm-10">

        <div class="form-check">
          <label><Field name="soilType" component="input" type="radio"  value="clay"/> Clay</label>

        </div>

    </div>

    <div class="col-sm-10">

        <div class="form-check">
          <label><Field name="soilType" component="input" type="radio" value="loam"/> Loam</label>

        </div>

    </div>

    <div class="col-sm-10">

        <div class="form-check">
          <label><Field name="soilType" component="input" type="radio" value="clayLoam"/> Clay Loam</label>

        </div>

    </div>

    <div class="col-sm-10">

        <div class="form-check">
          <label><Field name="soilType" component="input" type="radio" value="custom" /> Custom</label>
          <Field name="nh0" component="input" type="number" value="nh0"/>
          <Field name="alpha" component="input" type="number" value="alpha"/>

        </div>

    </div>
    </div>

    
  
    <div>
      <button type="submit" class="btn btn-primary" disabled={submitting}>Start Protocol</button>
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
export default connect()(reduxForm({
  form: 'baerInitializeForm',
  validate,
  onSubmit

})(BaerInitializeView));