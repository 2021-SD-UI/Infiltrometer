//The Page we are displaying for the baer Initialize view
import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
  Alert,
  Modal,
  Offcanvas
} from 'react-bootstrap';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from 'react-redux';
import beep from '../../audio/beep-01a.mp3';
import { useAudio } from '../../audio/Player';
import { Pages } from '../../page-redirection/Redirector';
import { setPage } from '../../page-redirection/redirector-slice';
import { selectCurReadingID, setGatheringData, selectCurId, selectReports } from '../../reports/reportsSlice';
import { selectInitialVolume, selectTimeInterval } from '../../reused-components/reused-slices/initializeSlice';
import { selectLastVolume } from '../../reused-components/reused-slices/replicationSlice';
import { StandardReplicationTable } from './StandardReplicationTable';
import './timer.css';



function hideStartButton() {
  document.getElementById("startButton").className = "w-50 visually-hidden"

}
function hideVolumeNow() {
  document.getElementById("volNow").className = "visually-hidden"
}


const StandardReplicationView = () => {
  const timeInterval = useSelector(selectTimeInterval);
  const initialVolume = Number(useSelector(selectInitialVolume));
  const lastVolume = Number(useSelector(selectLastVolume));
  const maxVolume = Math.min(initialVolume, lastVolume);
  const curID = useSelector(selectCurReadingID);
  const setPlaying = (playing) => setState({ ...state, timerIsPlaying: playing });
  const dispatch = useDispatch();

  const renderTime = ({ remainingTime }) => {
    setRemaining(remainingTime);
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

  const initializeState = {
    timerIsPlaying: false,
    key: 0,
  };
  const [state, setState] = useState(initializeState);
  const [remaining, setRemaining] = useState(0);
  const [show, setShow] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const reports = useSelector(selectReports);
  const curReport = reports[useSelector(selectCurId)];
  const readings = curReport.readings;

  function endProtocol() {

    //mark that we are done gathering data on this report
    dispatch(setGatheringData(false));

    //go to the results page
    dispatch(setPage(Pages.StandardResultsView))
  }
  function endProtocolInvalid() {
    stopProtocol();
    setShow(true);
  }
  function stopProtocol() {

    setState({
      ...state,
      timerIsPlaying: false
    })
  }
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
  function allValid() {
    for (let i = 1; i < readings.length; i++) {
      if (Number(readings[i - 1].volume) < Number(readings[i].volume)) return false;
    }
    return true;
  };

  /* Modal -------------------------------------------------------------- */
  const [playing, setAudPlaying] = useAudio(beep);


  /*Time -----------------------------------------------------------------*/

  const addRow = () => {

    //play audio
    setAudPlaying(false);
    setAudPlaying(true);

    //increment the interval
    //resume the timer
    setState({ timerIsPlaying: true, key: state.key + 1 });
  }

  /* --------------------------------------------------------------------- */

  return (
    <>
      <Container className="mt-3 rounded border shadow">
          <Row>
            <Col>
              <div className="my-3 timer-wrapper">
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
          <div className="fixed-bottom">
            <ProgressBar now={(remaining / (timeInterval)) * 100} />
          </div>
          <Row className="justify-content-center my-2">
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
                To properly conduct a Standard Protocol replication:
                <ol>
                  <li>Expose the soil about 1 to 3 cm in depth, removing any overlying ash or minerals.</li>
                  <li>With a full infiltrometer, place the porous disk flat against the soil and perpendicular to the surface. Tap the “Start Protocol" button as soon as the infiltrometer disk and the soil come into contact.</li>
                  <li>At the end of each interval, a field in the above table will automatically appear and be selected for data entry. Record the current volume.</li>
                  <li>Repeat these steps for as many intervals as necessary.</li>
                  <li>Once all replications have been completed, select the "End Protocol" button.</li>
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
    </>
  );

}

export default StandardReplicationView;