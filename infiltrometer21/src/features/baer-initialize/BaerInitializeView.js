//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReport } from '../reports/reportsSlice';
import {Protocols} from '../reports/protocols'
import { selectInitialVolume, selectInfiltrometerData,
  selectInfiltrometerRadius, selectInfiltrometerSuction,
setInitialVolume,
setInfiltrometerSuction, setTimeInterval, selectTimeInterval,setSoilType,selectSoilType} from './bear-initializeSlice';
import { Redirect } from 'react-router';
import { useEffect } from 'react';
import { setLastVolume } from '../baer-replication/bear-replicationSlice';
import { soilTypes } from '../../app/soilTypes';
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux';



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

  const { handleSubmit, pristine, reset, submitting } = props
  

  const initailState = {
    validated: false,
    redirect: null,
  };

  const [state, setState] = useState(false);

  //current soil type in the store
  const curSoilType = useSelector(selectSoilType);
  
  /**
   * Goes to baer replication page when we set the redirect
   * flag to true
   * @returns 
   */
  const Redirector = () =>{
    return state.redirect!=null ? <Redirect to ={state.redirect}/> : null;
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
    


      //set our redirect flag to true
      setState({...state,redirect: "/Infiltrometer/baer-replication"});
    
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
  /** validates suction
   * @returns true if valid, false if not valid
   * @param {the suction to check for validation} suction
   */
  function ValidateSuction() {
      let suction = useSelector(selectInfiltrometerSuction);
      return (suction > 0);
  }
  /**validates time interval
   * 
   * @returns ture if valid, otherwise false.
   * @param {the time interval to check for validation}
   */
  function ValidateTimeInterval() {
    let timeInterval = useSelector(selectTimeInterval);

    return (timeInterval > 0);
  }




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
    <div class="for-group row">
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
      <button type="submit" disabled={submitting}>Submit</button>
      <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
    </div>
  </form>


 
  <div class="form-group row">
   <button type="submit" class="btn btn-primary" onClick = {generateNewBaerReport}>Start Protocol</button>
  </div>
    </div>
    <Redirector/>
  </div>
     );
}
const onSubmit = (values, dispatch) => {
  
  dispatch(setInitialVolume(Number(values.volume)));
  dispatch(setLastVolume(Number(values.volume)));
  dispatch(setTimeInterval(Number(values.timeInterval)));
  dispatch(setInfiltrometerSuction(Number(values.suction)));
  switch (values.soilType) {
    case "clay":
      dispatch(setSoilType(soilTypes.clay));
      break;

    case "clayLoam":
      dispatch(setSoilType(soilTypes.clayLoam));
      break;
    case "loam":
      dispatch(setSoilType(soilTypes.loam));
      break;
    case "custom":
      dispatch(setSoilType(soilTypes.default));
      break;
    default:
      break;
  }

  
  
}
export default connect()(reduxForm({
  form: 'baerInitializeForm',
  validate,
  onSubmit

})(BaerInitializeView));