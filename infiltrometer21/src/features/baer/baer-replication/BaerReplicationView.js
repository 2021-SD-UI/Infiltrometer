/* React/Redux Imports */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  Modal,
  Button,
  Form,
  Container,
  Row,
  Col,
  Accordion,
  Card,
  ProgressBar
} from 'react-bootstrap';

/* Slice Imports */
import { addReading, selectCurReadingID, setGatheringData } from '../../reports/reportsSlice';
import { selectTimeInterval, selectInitialVolume } from '../../reused-components/reused-slices/initializeSlice';
import { setVolume, setSecondsElapsed, selectLastVolume, setLastVolume } from '../../reused-components/reused-slices/replicationSlice';
import { setPage } from '../../page-redirection/redirector-slice';

/* HTML/CSS Imports */
import './timer.css'
import Table from '../baer-results/table';

/* Other Imports */
import { addGeoDataToReading } from '../../useful-functions/usefulFunctions';
import { useAudio } from '../../audio/Player';
import beep from '../../audio/beep-01a.mp3';
import { Pages } from '../../page-redirection/Redirector';


const BaerReplicationView = () => {
  const initializeState = {
    timerIsPlaying: false,
    key: 0
  };
  const curID = useSelector(selectCurReadingID); // ID of reading, not report
  const initialVolume = Number(useSelector(selectInitialVolume));


  let timeInterval = useSelector(selectTimeInterval);
  const [remaining, setRemaining] = useState(timeInterval);
  let lastVolume = Number(useSelector(selectLastVolume));
  let maxVolume = Math.min(initialVolume, lastVolume);
  let setPlaying = (playing) => setState({
    ...state,
    timerIsPlaying: playing
  });
  let dispatch = useDispatch();
  let [state, setState] = useState(initializeState);

  function endProtocol() { // Mark that we are done gathering data on this report
    dispatch(setGatheringData(false));

    // Go to the results page
    dispatch(setPage(Pages.BaerResultsView))
  }

  // Modal ==============================================================================
  let [show, setShow] = useState(false);
  let [playing, setAudPlaying] = useAudio(beep);
  const handleClose = () => {
    setShow(false);
    setPlaying(false)
  };
  const handleOpen = () => {
    setAudPlaying(false);
    setAudPlaying(true);
    setShow(true);
  }
  /* Handles render logic for the countdown timer */
  const renderTime = ({ remainingTime }) => {

    setRemaining(remainingTime);

    if (remainingTime === 0) {
      return <div className="timer">Time is up!</div>;
    }

    return (
      <div className="timer">
        <div className="text">Time remaining:</div>
        <div className="value">
          {remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const volumeReading = document.getElementById("volumeReading").value;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else { // Calculate the total number of elapsed seconds
      let secondsElapsed = (curID + 1) * timeInterval;

      // Set the volume and time in the replication store
      dispatch(setLastVolume(volumeReading));
      dispatch(setVolume(volumeReading));
      dispatch(setSecondsElapsed(secondsElapsed));

      // Add the reading using the reports slice
      // Try to gather geo data
      addGeoDataToReading({
        volume: volumeReading,
        secondsElapsed
      }, (newReading) => {
        dispatch(addReading(newReading));
      });

      // Close modal
      handleClose();
    }
  };
  // ====================================================================================

  return (
    <>
      <Container className="mt-5 rounded border shadow">
        <h1 className="pt-5 display-4">Current Replication: {
          curID + 1
        }</h1>

        {/* Timer */}
        <Row>
          <Col>
            <div className="mt-4 timer-wrapper">
              <CountdownCircleTimer key={
                state.key
              }
                isPlaying={
                  state.timerIsPlaying
                }
                duration={
                  Number(timeInterval)
                }
                colors={
                  [
                    [
                      "#004777", 0.33
                    ],
                    [
                      "#F7B801", 0.33
                    ],
                    ["#A30000"]
                  ]
                }
                onComplete={
                  () => handleOpen()
                }>
                {renderTime} </CountdownCircleTimer>
            </div>
          </Col>
        </Row>

        {/* Buttons */}
        <Row className="text-center">
          <Col className="mt-4">
            <Button variant="dark" className="w-50" size="lg"
              disabled={
                state.timerIsPlaying
              }
              onClick={
                () => {
                  setState({
                    timerIsPlaying: true,
                    key: state.key + 1
                  });
                }
              }>
              {
                !state.timerIsPlaying ? "Start Replication" : "Replication Running..."
              } </Button>
          </Col>
        </Row>
        <Row className="text-center">
          <Col className="mt-2">
            <Button variant="secondary" className="w-50" size="lg"
              onClick={endProtocol}>
              End Protocol
            </Button>
          </Col>
        </Row>

        {/* Table */}
        <Row className="mt-4">
          <Col>
            <Table>{/* This table is rendered from table.js */}</Table>
          </Col>
        </Row>

        {/* Help Button */}
        <Row>
          <Col className="mb-4 mt-2 mx-2">
            <Accordion className="w-100">
              <Card bg='primary' text='white'>
                <Accordion.Toggle as={
                  Card.Header
                }
                  eventKey="0"
                  className='text-center'>Help</Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h2>How to conduct a replication:</h2>
                    <ol type="1">
                      <li>Expose the soil about 1 to 3 cm in depth, removing any overlying ash or minerals.</li>
                      <li>With a full infiltrometer, place the porous disk flat against the soil and perpendicular to the surface. Tap the “Start Replication” button as soon as the infiltrometer disk and the soil come into contact.</li>
                      <li>At the end of the timer, remove the infiltrometer from the soil and hold the top of the tube so that the water is at eye level. Record the end volume.</li>
                      <li>Repeat these steps for as many replications as necessary.</li>
                      <li>Once all replications have been completed, select the "End Protocol" button</li>
                    </ol>
                    <hr />
                    <h2>Hydrophobicity Classification</h2>
                    <ol type="1">
                      <li>{"Strong ( 0 to < 3 mL/min)"}</li>
                      <li> {"Weak ( 3 to < 8 mL/min)"}</li>
                      <li>{"None ( > 8 mL/min)"}</li>
                    </ol>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>

      </Container>
      <div className="fixed-bottom">
        <ProgressBar now={
          (remaining / (timeInterval)) * 100
        } />
      </div>
      {/* Modal */}
      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        centered>
        <Modal.Header>
          <Modal.Title>Enter volumetric data for replication: {
            curID + 1
          }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated
            onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Text muted>
                Previous volume: {maxVolume}
                mL
              </Form.Text>
              <Form.Control required autofocus type="number" step="any" size="lg" min="0"
                max={maxVolume}
                id="volumeReading"
                placeholder="Volume (mL)" />
              <Form.Control.Feedback type="invalid">
                Enter a valid reading, or hit "Cancel".
              </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button variant="outline-secondary" size="lg"
                onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="dark" size="lg">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );

}

export default BaerReplicationView;
