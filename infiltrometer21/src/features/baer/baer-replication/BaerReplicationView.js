//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setVolume, setSecondsElapsed, selectLastVolume, setLastVolume } from './bear-replicationSlice';
import reportsSlice, {addReading, selectCurId, selectReports, selectCurReadingID, setGatheringData} from '../../reports/reportsSlice';
import { selectTimeInterval, selectInitialVolume, setSoilType, selectSoilType } from '../baer-initialize/bear-initializeSlice';
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import "./timer.css";
import _default from 'react-overlays/esm/Modal';
import { useEffect } from 'react';
import { setPage } from '../../page-redirection/redirector-slice';
import  Table  from '../baer-results/table';
import { Modal, Button, FormControl, Form, FormGroup, FormLabel, InputGroup } from 'react-bootstrap';
import { Component } from 'react';

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

  //Gets the current reading in the baer-replicationSlice
  const timeInterval = useSelector(selectTimeInterval);
  const initialVolume = Number(useSelector(selectInitialVolume));
  const lastVolume = Number(useSelector(selectLastVolume));

  //the max allowed volume
  const maxVolume = Math.min(initialVolume, lastVolume);
  const dispatch = useDispatch();

  const initializeState = {
    timerIsPlaying: false,
    key: 0,
  };

  const [state, setState] = useState(initializeState);

  //use to set the timer is playing variable
  const setPlaying = (playing)=>setState({...state, timerIsPlaying:playing});
  const curID = useSelector(selectCurReadingID);

  function endProtocol(){

    //mark that we are done gathering data on this report
    dispatch(setGatheringData(false));


    //go to the results page
    dispatch(setPage("/Infiltrometer/baer-results"))
  }

    /* Modal -------------------------------------------------------------- */
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const handleClose = () => {setShow(false); setPlaying(false)};
    const handleShow = () => setShow(true);
    const handleSubmit = (event) => {
      event.preventDefault();
      setValidated(true);
      const form = event.currentTarget;
      const volumeReading = document.getElementById("volumeReading").value;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      else {
        handleClose();
        //calculate the total number of elapsed seconds
        let secondsElapsed = (curID + 1) * timeInterval;
      
        //set the volume and time in the replication store
        dispatch(setLastVolume(volumeReading));
        dispatch(setVolume(volumeReading));
        dispatch(setSecondsElapsed(secondsElapsed));
        
        //add the reading using the reports slice
        dispatch(addReading({volume: volumeReading, secondsElapsed}));
      }
    };
    /* --------------------------------------------------------------------- */

  return (
       
      <div class="container-fluid">
        <div class = "container">
            <div class = "row mt-5"/>
            <div class ="row">
                <div class="col-2"></div>
                <div class="col-8 text-center">
                    <div class="display-4 ">
                      Current Replication: {curID}
                    </div>
                </div>
                <div class="col-2"></div>
            </div>
            <div class = "row mt-5"/>
        </div>
          
        <div class="row-12">
            
          <div class="col-4"/>
          <div class ="timer-wrapper">
            <CountdownCircleTimer
                key={state.key}
                isPlaying = {state.timerIsPlaying}
                duration={Number(timeInterval)}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                onComplete={() => handleShow()}
              >
                {renderTime}
            </CountdownCircleTimer>
          </div>
          <div class="col-4"/>
        </div>

        <div class = "container">
          <div class = "row mt-4"/>
          <div class = "row-8 text-center">
            <div class="btn btn-dark w-50"
              disabled={state.timerIsPlaying}
              onClick = {()=>{
              setState({
                timerIsPlaying: true,
                key: state.key+1}
                );
                }}> {
                  !state.timerIsPlaying? "Start Replication" : "Replication Running..." 
                    }
            </div>
          </div>
          <div class = "row mt-2"/>
          <div class = "row-8 text-center">
            <div class="btn btn-secondary w-50" onClick = {endProtocol}>
              End Protocol
            </div>
          </div>
          <div class = "row mt-2"/>
        </div>

          <div class ="container">
            <div class="row-4">
              <div class = "row mt-4"/>
                <Table  class="col-8"/>
              <div class = "row mt-4"/>
            </div>
          </div>

      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          centered
        >        
          <Modal.Header>
            <Modal.Title>Enter data below</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                required
                type="number"
                step="any"
                min="0"
                max={maxVolume}
                id="volumeReading"
                placeholder="Volume (mL)"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid reading, or click "Cancel".
                </Form.Control.Feedback>
              </Form.Group>
              <Modal.Footer>
                <Button variant="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="btn btn-dark">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
            
         <div class = "col-10"/>
      </div>);

}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<BaerReplicationView />, rootElement);
export default BaerReplicationView;