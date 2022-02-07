//The Page we are displaying for the baer Initialize view
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setVolume, setSecondsElapsed, selectLastVolume, setLastVolume } from './bear-replicationSlice';
import reportsSlice, { addReading, selectCurId, selectReports, selectCurReadingID, setGatheringData } from '../../reports/reportsSlice';
import { selectTimeInterval, selectInitialVolume, setSoilType, selectSoilType } from '../baer-initialize/bear-initializeSlice';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import './timer.css'
import _default from 'react-overlays/esm/Modal';
import { setPage } from '../../page-redirection/redirector-slice';
import Table from '../baer-results/table';
import { Modal, Button, Form, Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import { addGeoDataToReading } from '../../useful-functions/usefulFunctions';
import { useAudio } from '../../audio/Player';
import { Pages } from '../../page-redirection/Redirector';
import beep from '../../audio/beep-01a.mp3';

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
  const timeInterval = useSelector(selectTimeInterval);
  const initialVolume = Number(useSelector(selectInitialVolume));
  const lastVolume = Number(useSelector(selectLastVolume));
  const maxVolume = Math.min(initialVolume, lastVolume);
  const curID = useSelector(selectCurReadingID);
  const setPlaying = (playing) => setState({ ...state, timerIsPlaying: playing });
  const dispatch = useDispatch();

  const initializeState = {
    timerIsPlaying: false,
    key: 0,
  };
  const [state, setState] = useState(initializeState);

  function endProtocol() {

    //mark that we are done gathering data on this report
    dispatch(setGatheringData(false));

    //go to the results page
    dispatch(setPage(Pages.BaerResultsView))
  }

  /* Modal -------------------------------------------------------------- */
  const [show, setShow] = useState(false);
  const [playing, toggle] = useAudio(beep);
  const [validated, setValidated] = useState(false);
  const handleClose = () => { setShow(false); setPlaying(false) };
  const handleShow = () => {

    //play audio
    if (!playing) toggle();

    //open the modal
    setShow(true);

  }
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
      setValidated(false);
      //calculate the total number of elapsed seconds
      let secondsElapsed = (curID + 1) * timeInterval;

      //set the volume and time in the replication store
      dispatch(setLastVolume(volumeReading));
      dispatch(setVolume(volumeReading));
      dispatch(setSecondsElapsed(secondsElapsed));

      //add the reading using the reports slice
      //try to gather geo data
      addGeoDataToReading({ volume: volumeReading, secondsElapsed }, (newReading) => {
        dispatch(addReading(newReading));
      });



    }
  };
  /* --------------------------------------------------------------------- */

  return (
    <>
      <Container className="mt-3">
        <div class="rounded border shadow">
          <h1 className="pt-5 display-4">Current Replication: {curID + 1}</h1>
          <Row>
            <Col>
              <div className="mt-4 timer-wrapper">
                <CountdownCircleTimer
                  key={state.key}
                  isPlaying={state.timerIsPlaying}
                  duration={Number(timeInterval)}
                  colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                  onComplete={() => handleShow()}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
            </Col>
          </Row>
          <Row className="text-center">
            <Col className="mt-4">
              <Button
                variant="dark"
                className="w-50"
                size="lg"
                disabled={state.timerIsPlaying}
                onClick={() => { setState({ timerIsPlaying: true, key: state.key + 1 }); }}
              >
                {!state.timerIsPlaying ? "Start Replication" : "Replication Running..."}
              </Button>
            </Col>
          </Row>
          <Row className="text-center">
            <Col className="mt-2">
              <Button
                variant="secondary"
                className="w-50"
                size="lg"
                onClick={endProtocol}
              >
                End Protocol
              </Button>
            </Col>
          </Row>
          <Row className="text-center">
            <Col className="mt-2">
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Help
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      To properly conduct a BAER protocol replication:
                      1. Expose the soil about 1 to 3 cm in depth, removing any overlying ash or minerals.
                      2. With a full infiltrometer, place the porous disk flat against the soil and perpendicular to the surface. Tap the “Start Replication” button as soon as the infiltrometer disk and the soil come into contact.
                      3. At the end of the timer, remove the infiltrometer from the soil and hold the top of the tube so that the water is at eye level. Record the end volume.
                      4. Repeat these steps for as many replications as necessary.”
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

            </Col>

          </Row>
          <Row className="mt-4">
            <Col>
              <Table>{/* This table is rendered from table.js */}</Table>
            </Col>
          </Row>
        </div>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
      >
        <Modal.Header>
          <Modal.Title>Enter volumetric data for replication: {curID + 1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.Text muted>
                Previous volume: {maxVolume} mL
              </Form.Text>
              <Form.Control
                required
                type="number"
                step="any"
                size="lg"
                min="0"
                max={maxVolume}
                id="volumeReading"
                placeholder="Volume (mL)"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid reading, or hit "Cancel".
              </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="dark"
                size="lg"
              >
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