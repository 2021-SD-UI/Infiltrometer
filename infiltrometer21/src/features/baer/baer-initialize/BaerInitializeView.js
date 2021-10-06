//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReading, newReport, selectCurId, selectReports } from '../../reports/reportsSlice';
import {Protocols} from '../../reports/protocols'
import { selectInitialVolume, selectInfiltrometerData,
  selectInfiltrometerRadius, selectInfiltrometerSuction,
setInitialVolume,
setInfiltrometerSuction, setTimeInterval, selectTimeInterval,setSoilType,selectSoilType, setInfiltrometerData} from './bear-initializeSlice';
import { setLastVolume, setSecondsElapsed } from '../baer-replication/bear-replicationSlice';
import { soilTypes } from '../../../app/soilTypes';
import {Field, formValueSelector, reduxForm} from 'redux-form'
import { connect } from 'react-redux';
import { setPage } from '../../page-redirection/redirector-slice';
import { Button, Form, FormLabel, Dropdown, DropdownButton } from 'react-bootstrap';
import { infiltrometerTypes } from '../../../app/infiltrometerType';
import { useEffect } from 'react';


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
  const curInfiltrometerData = useSelector(selectInfiltrometerData);

  const dispatch = useDispatch();
  /**
   * Adds a new Baer prototocol report using the reports slice
   * 
   */
  const setFormSoilType = (soilType)=>{
    if (soilType){
      change("nh0", soilType.nh0);
      change("alpha",soilType.alpha);

      dispatch(setSoilType({
          nh0: soilType.nh0,
          alpha:soilType.alpha
      }));
    }
    
  }
  const setInfiltrometerType = (infiltrometerType) =>{
    change("radius", infiltrometerType.radius);
   
  }

  //the empty second array means "Only execute once"
  useEffect(()=>{
    loadDataAtStart();
  }, []);


  function loadDataAtStart(){
    
    //this is a check to say "if not initial"
    if (curInfiltrometerData.infiltrometerRadius != 0){
      //get the current report and populate data
      change("radius", curInfiltrometerData.infiltrometerRadius);
      change("nh0", curSoilType.nh0);
      change("alpha",curSoilType.alpha);
      change("volume", curInfiltrometerData.initialVolume);
      change("suction", curInfiltrometerData.infiltrometerSuction);
      change("timeInterval", curInfiltrometerData.timeInterval);
    }  

    


  }

  return (
  <div class = "col-sm-10">
  
        
  <div class="container">



  <Form onSubmit = {handleSubmit} expand="lg" bg="dark" variant="dark">
    <div class="form-group row">
      <label for="volume" class="col-sm-2 col-form-label" >Initial Volume (mL)</label>
      <div class="col-sm-10">
        <Field name="volume" type ="number" component={renderField} label="Initial Volume"/>
      </div>
    </div>

    <div class="form-group row">
      <FormLabel for="suction" class="col-sm-2 col-form-label" >Suction (cm)</FormLabel>
      <div class="col-sm-10">
      <Field name="suction" type="number" component={renderField} label="Suction"/>
      </div>
    </div>

    <div class="form-group row">
      <FormLabel for="timeInterval" class="col-sm-2 col-form-label" >Time Interval (sec)</FormLabel>
      <div class="col-sm-10">
      <Field name="timeInterval" type="number" component={renderField} label="Time Interval"/>
      </div>
    </div>

    <div class="form-group row">
      <FormLabel for="radius" class="col-sm-2 col-form-label" >Radius (cm)</FormLabel>
      <div class = "form-group col-sm-10">
        <div class="form-group row">
      <div class="col-sm-10">
      <DropdownButton  title="Preset Infiltrometer Types" component="select" bg="dark" variant="dark">
        <Dropdown.Item onSelect = {()=>setInfiltrometerType(infiltrometerTypes.MiniDisk)}>
          {infiltrometerTypes.MiniDisk.displayName}
        </Dropdown.Item>
        <Dropdown.Item onSelect = {()=>setInfiltrometerType(infiltrometerTypes.MiniDiskV1)}>
          {infiltrometerTypes.MiniDiskV1.displayName}
        </Dropdown.Item>
      </DropdownButton>
      </div>
      <Field name="radius" type="number"  component={renderField} label="Radius"/>
      </div>
      </div>

    </div>

    <div class="row">
      <label for="soilType" class="col-sm-2 col-form-label" >Soil Type</label>
     
    <div class="col-sm-10">

        <div class="form-group row">
          <div class="col-sm-10">


           <DropdownButton  title="Preset Soil Types" component="select" bg="dark" variant="dark">
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.clay)} >Clay</Dropdown.Item>
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.clayLoam)} >Clay Loam</Dropdown.Item>
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.loam)} >Loam</Dropdown.Item>
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.loamySand)} >Loamy Sand</Dropdown.Item>
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.sand)} >Sand</Dropdown.Item>
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.sandyClay)} >Sandy Clay</Dropdown.Item>
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.sandyLoam)} >Sandy Loam</Dropdown.Item>
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.silt)} >Silt</Dropdown.Item>
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.siltLoam)} >Silt Loam</Dropdown.Item>
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.siltyClay)} >Silty Clay</Dropdown.Item>
              <Dropdown.Item onSelect = {()=>setFormSoilType(soilTypes.siltyClayLoam)} >Silty Clay Loam</Dropdown.Item>
            </DropdownButton>

          </div>
         
          <div  class="col-sm-10">
            <FormLabel for="nh0" class="row" >(NH/O)</FormLabel>
            <Field name="nh0" component={renderField} type="number" value="nh0" label="NH0"/>
          </div>
          <div class="form-group row">
            <FormLabel for="alpha" class = "row">(Alpha)</FormLabel>
            <Field name="alpha" component={renderField} type="number" value="alpha" label="Alpha"/>
          </div>
          

        </div>

    </div>
    </div>

    
  
     <div class="form-group row col-sm-4">
      <Button type="submit" bg="dark" variant="dark" disabled={submitting}>Start Protocol</Button>
      </div>
      <div class="form-group row col-sm-4">
      <Button type="button" class="btn btn-secondary"  disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
    </div>
  </Form>

    </div>
  </div>
     );
}
const onSubmit = (values, dispatch) => {

  
  let infiltrometerData = {
     initialVolume: Number(values.volume),
        
              coordinates: {
                lat:0,
                long: 0,
                },
                soilType:
                  {
                    nh0: values.nh0,
                    alpha: values.alpha
                  },
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