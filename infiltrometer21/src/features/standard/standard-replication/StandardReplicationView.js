/* React/Redux Imports */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Form, ProgressBar, Row, Alert, Modal, Offcanvas } from 'react-bootstrap';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

/* Slice Imports */
import { setPage } from '../../page-redirection/redirector-slice';
import { setGatheringData, selectCurId, selectReports } from '../../reports/reportsSlice';
import { selectTimeInterval } from '../../reused-components/reused-slices/initializeSlice';

/* HTML/CSS Imports */
import './timer.css';
import { StandardReplicationTable } from './StandardReplicationTable';

/* Other Imports */
import beep from '../../audio/beep-01a.mp3';
import { useAudio } from '../../audio/Player';
import { Pages } from '../../page-redirection/Redirector';

const StandardReplicationView = () => {
  const initializeState = {
    timerIsPlaying: false,
    key: 0,
  };
  const timeInterval = useSelector(selectTimeInterval);
  const dispatch = useDispatch();
  const [playing, setAudPlaying] = useAudio(beep);
  const [state, setState] = useState(initializeState);
  const [remaining, setRemaining] = useState(0);
  const [show, setShow] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const reports = useSelector(selectReports);
  const curReport = reports[useSelector(selectCurId)];
  const readings = curReport.readings;
  const renderTime = ({ remainingTime }) => {
    setRemaining(remainingTime);
    if (remainingTime === 0) 
      return <div className="timer">Time is up!</div>;

    return (
      <div className="timer">
        <div className="text">Time remaining:</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  function hideStartButton() {
    document.getElementById("startButton").className = "w-50 visually-hidden"
  }

  // Signal that we are done gathering data
  // Go to results page
  function endProtocol() {
    dispatch(setGatheringData(false));
    dispatch(setPage(Pages.StandardResultsView))
  }

  // Signal that we are done gathering data
  // Show "are you sure?" modal
  function endProtocolInvalid() {
    setState({
      ...state,
      timerIsPlaying: false
    });
    setShow(true);
  }

  // Handles closing the "are you sure?" modal
  function handleClose() {
    setShow(false);
    setState({
      ...state,
      timerIsPlaying: false
    })
  }

  function handleSubmit() {
    endProtocol();
  }

  // Function for validating table entries
  // Returns false if any previous entry is less than the current entry
  function allValid() {
    for (let i = 1; i < readings.length; i++) {
      if (Number(readings[i - 1].volume) < Number(readings[i].volume)) return false;
    }
    return true;
  };

  // Function for adding a new table entry
  // Plays the audio beep and increments the entry key
  function addRow() {
    setAudPlaying(false);
    setAudPlaying(true);
    setState({ timerIsPlaying: true, key: state.key + 1 });
  }

  return (
    <>
      <Container className="mt-4 p-3 rounded border shadow">
          <Row>
            <Col>
              <div className="mb-3 timer-wrapper">
                <CountdownCircleTimer
                  key={state.key}
                  isPlaying={state.timerIsPlaying}
                  duration={Number(timeInterval)}
                  colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                  onComplete={() => addRow()}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
            </Col>
          </Row>
            <StandardReplicationTable intervals={state.key} />
          <Row className="justify-content-center">
            <Button
              variant="dark"
              className="w-50"
              size="lg"
              id="startButton"
              disabled={state.timerIsPlaying}
              onClick={() => { setState({ timerIsPlaying: true, key: state.key + 1 }); hideStartButton() }}
            >
              {!state.timerIsPlaying ? "Start Protocol" : "Replication Running..."}
            </Button>
          </Row>
          {allValid() ? null :
            <Row className="text-center mb-2">
              <Alert
                variant="danger"
                className="w-100"
              >
                Please correct all invalid data before continuing.
              </Alert>
            </Row>
          }
          <Row className="justify-content-center mt-2">
            <Button
              variant="secondary"
              className="w-50"
              size="lg"
              onClick={allValid() ? endProtocol : endProtocolInvalid}
            >
              {state.timerIsPlaying ? "End Protocol" : "Continue"}
            </Button>
          </Row>

          <Row className="justify-content-center mt-2">
            <Button 
              variant="primary" 
              hidden={state.timerIsPlaying} 
              className="w-50"
              size="lg"
              onClick={() => setShowHelp(true)}
            >
              Help
            </Button>
            <Offcanvas
              show={showHelp}
              onHide={() => setShowHelp(false)}
              placement="bottom"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Protocol Guide</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <h4>To properly conduct a Standard Protocol replication:</h4>
                <ol>
                  <li>Expose the soil about 1 to 3 cm in depth, removing any overlying ash or minerals.</li>
                  <li>With a full infiltrometer, place the porous disk flat against the soil and perpendicular to the surface. Tap the “Start Protocol" button as soon as the infiltrometer disk and the soil come into contact.</li>
                  <li>At the end of each interval, a field in the above table will automatically appear and be selected for data entry. Record the current volume.</li>
                  <li>Repeat these steps for as many intervals as necessary.</li>
                  <li>Once all replications have been completed, select the "End Protocol" button. You can then review your data and edit fields as necessary.</li>
                  <li>Tap the "Continue" button to proceed to the results page.</li>
                </ol>
              </Offcanvas.Body>
            </Offcanvas>
          </Row>
      </Container>

      {/* Modal */}
      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        centered>
        <Modal.Header>
          <Modal.Title>Continue with invalid data?</Modal.Title>
        </Modal.Header>
        <Form noValidate validated
          onSubmit={handleSubmit}>
          <Modal.Footer>
            <Button variant="outline-secondary" size="lg"
              onClick={handleClose}>
              Edit Fields
            </Button>
            <Button type="submit" variant="dark" size="lg">
              Continue
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
      <ProgressBar className="fixed-bottom" now={ (remaining / (timeInterval)) * 100} />
    </>
  );

}

export default StandardReplicationView;