
import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { addGeoDataToReading } from "../../useful-functions/usefulFunctions";
import { addReading, selectCurReadingID } from "../../reports/reportsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectTimeInterval, selectInitialVolume } from "../../reused-components/reused-slices/initializeSlice";
import { setLastVolume, setSecondsElapsed, setVolume, selectLastVolume } from "../../reused-components/reused-slices/replicationSlice";

const VolumeNow = ({ time, hidden }) => {

    const timeInterval = useSelector(selectTimeInterval);
    const curID = useSelector(selectCurReadingID);
    const dispatch = useDispatch();
    const timeRemaining = { time }.time;
    const [validated, setValidated] = useState(false);
    const initialVolume = Number(useSelector(selectInitialVolume));
    const lastVolume = Number(useSelector(selectLastVolume));
    const maxVolume = Math.min(initialVolume, lastVolume);
    const makeVisible = () => {
        if (!(timeRemaining === 0)) {
            document.getElementById("volumeNowForm").className = "visible";
        }
    }
    const makeHidden = () => {
        document.getElementById("volumeNowForm").className = "visually-hidden";
        clear();
    }
    const clear = () => {
        document.getElementById("volumeNow").value = '';
    }
    const isFinished = () => {
        if (timeRemaining === 0) {
            makeHidden();
        }
    }
    const VolumeNowSubmit = (event) => {

        event.preventDefault();
        setValidated(true);
        const form = event.currentTarget;
        const volumeNow = document.getElementById("volumeNow").value;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            setValidated(false);
            //calculate the total number of elapsed seconds
            console.log(timeRemaining);
            console.log(timeInterval);
            let secondsElapsed = (timeInterval - timeRemaining);

            //set the volume and time in the replication store
            dispatch(setLastVolume(volumeNow));
            dispatch(setVolume(volumeNow));
            dispatch(setSecondsElapsed(secondsElapsed));

            //add the reading using the reports slice
            //try to gather geo data
            addGeoDataToReading({ volume: volumeNow, secondsElapsed }, (newReading) => {
                dispatch(addReading(newReading));
            });
            clear();
        }

    }

    function isHidden() {
        if (hidden) {
            return "visually-hidden";
        }
        return "visible";
    }

    return (
        <>

            <Form className={isHidden()} id="volumeNowForm" onSubmit={VolumeNowSubmit}>
                <Form.Group role="form">
                    <Form.Control
                        id="volumeNow"
                        type="number"
                        placeholder="Volume"
                        className="form-control mt-4"
                        min="0"
                        max={maxVolume}
                        onChange={isFinished}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid reading, or hit "Cancel".
                    </Form.Control.Feedback>
                    <Button className="btn btn-dark btn-large centerButton mt-4 m-2 w-25" type="submit">Add</Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default VolumeNow;