//The Page we are displaying for the baer Initialize view
import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from 'react-redux';
import beep from '../../audio/beep-01a.mp3';
import { useAudio } from '../../audio/Player';
import { Pages } from '../../page-redirection/Redirector';
import { setPage } from '../../page-redirection/redirector-slice';
import { addReading, selectCurReadingID, setGatheringData } from '../../reports/reportsSlice';
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
  function endProtocol() {

    //mark that we are done gathering data on this report
    dispatch(setGatheringData(false));

    //go to the results page
    dispatch(setPage(Pages.StandardResultsView))
  }

  /* Modal -------------------------------------------------------------- */
  const [show, setShow] = useState(false);
  const [playing, toggle] = useAudio(beep);
  const [validated, setValidated] = useState(false);


  /*Time -----------------------------------------------------------------*/

  const addRow = () => {

    //play audio
    if (!playing) toggle();

    //increment the interval
    //resume the timer
    setState({ timerIsPlaying: true, key: state.key + 1 });
    toggle();
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
          <Row className="mt-4">
            <Col>
              <StandardReplicationTable intervals={state.key} />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );

}

export default StandardReplicationView;