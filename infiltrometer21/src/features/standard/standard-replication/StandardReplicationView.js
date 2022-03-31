//The Page we are displaying for the baer Initialize view
import React, { useState, useRef } from 'react';
import { Button, Col, Container, Form, ProgressBar, Row, Card, Accordion, Overlay, Tooltip, Alert } from 'react-bootstrap';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from 'react-redux';
import beep from '../../audio/beep-01a.mp3';
import { useAudio } from '../../audio/Player';
import { Pages } from '../../page-redirection/Redirector';
import { setPage } from '../../page-redirection/redirector-slice';
import { addReading, selectCurReadingID, setGatheringData, selectCurId, selectReports } from '../../reports/reportsSlice';
import { selectInitialVolume, selectTimeInterval } from '../../reused-components/reused-slices/initializeSlice';
import { selectLastVolume, setLastVolume, setSecondsElapsed, setVolume } from '../../reused-components/reused-slices/replicationSlice';
import { addGeoDataToReading } from '../../useful-functions/usefulFunctions';
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

  const reports = useSelector(selectReports);
  const curReport = reports[useSelector(selectCurId)];
  const readings = curReport.readings;

  function endProtocol() {

    //mark that we are done gathering data on this report
    dispatch(setGatheringData(false));

    //go to the results page
    dispatch(setPage(Pages.StandardResultsView))
  }
  function stopProtocol() {

    setState({
      ...state,
      timerIsPlaying: false
    })
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
      <Container className="mt-3">
        <div class="rounded border shadow">
          <Row>
            <Col>
              <div className="mt-4 timer-wrapper">
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
          <Row className="text-center">
            <Col className="mt-4">
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
            </Col>
          </Row>
          {allValid() ? null :
            <Row className="text-center mb-2">
              <Col>
                <Alert
                  variant="danger"
                  className="w-100"
                  size="lg"
                >
                  Please correct all invalid data before continuing.
                </Alert>
              </Col>
            </Row>
          }
          <Row className="text-center mb-4 mt-2">
            <Col>
              <Button
                variant="secondary"
                className="w-50"
                size="lg"
                onClick={allValid() ? endProtocol : state.timerIsPlaying ? stopProtocol : endProtocol}
              >
                {state.timerIsPlaying ? "End Protocol" : "Continue"}
              </Button>
            </Col>
          </Row>

          <ProgressBar now={(remaining / (timeInterval)) * 100} />
          <Row className="mb-4 mt-2 mx-1">
            <Col>
              <Accordion className="w-100">
                <Card
                  bg='primary'
                  text='white'>
                  <Accordion.Toggle as={Card.Header} eventKey="0" className='text-center'>Help</Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>To properly conduct a Standard Protocol replication:
                      <ol type="1">
                        <li>Expose the soil about 1 to 3 cm in depth, removing any overlying ash or minerals.</li>
                        <li>With a full infiltrometer, place the porous disk flat against the soil and perpendicular to the surface. Tap the “Start Protocol" button as soon as the infiltrometer disk and the soil come into contact.</li>
                        <li>At the end of each interval, a field in the above table will automatically appear and be selected for data entry. Record the current volume.</li>
                        <li>Repeat these steps for as many intervals as necessary.</li>
                        <li>Once all replications have been completed, select the "End Protocol" button.</li>
                      </ol>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );

}

export default StandardReplicationView;