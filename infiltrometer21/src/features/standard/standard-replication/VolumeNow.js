
import React, {useState} from "react";
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";
import {setLastVolume, setSecondsElapsed, setVolume} from "../../baer/baer-replication/bear-replicationSlice";
import {addGeoDataToReading} from "../../useful-functions/usefulFunctions";
import {addReading, selectCurReadingID} from "../../reports/reportsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectTimeInterval} from "../standard-initialize/standard-initializeSlice";



const VolumeNow = ({time}) => {

    const timeInterval = useSelector(selectTimeInterval);
    const curID = useSelector(selectCurReadingID);
    const dispatch = useDispatch();
    const timeRemaining = {time}.time;

    const [validated, setValidated] = useState(false);
    const makeVisible = () => {
        if(!(timeRemaining === 0)) {
            document.getElementById("volumeNowForm").className = "visible";
        }
    }
    const makeHidden = () => {
        document.getElementById("volumeNowForm").className = "visually-hidden";
        document.getElementById("volumeNow").value = '';
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
            let secondsElapsed = (curID + 1) * (timeInterval - timeRemaining);

            //set the volume and time in the replication store
            dispatch(setLastVolume(volumeNow));
            dispatch(setVolume(volumeNow));
            dispatch(setSecondsElapsed(secondsElapsed));

            //add the reading using the reports slice
            //try to gather geo data
            addGeoDataToReading({ volume: volumeNow, secondsElapsed }, (newReading) => {
                dispatch(addReading(newReading));
            });
            makeHidden();
        }

    }
    return(
        <>
            <Button className="mt-2 btn-dark w-25" id="volumeButton" onClick={makeVisible}>Volume Now</Button>
            <Form  className="visually-hidden" id="volumeNowForm" onSubmit={VolumeNowSubmit}>
                <Form.Group role="form">
                    <Form.Control
                        id="volumeNow"
                        type="number"
                        placeholder="Volume"
                        className="form-control mt-4"
                    />
                    <Button className="btn btn-dark btn-large centerButton mt-4 m-2 w-25" type="submit">Add</Button>
                    <Button className="btn btn-secondary btn-large centerButton mt-4 m-2 w-25" onClick={makeHidden}>Cancel</Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default VolumeNow;