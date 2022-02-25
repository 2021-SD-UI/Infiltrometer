import { Container, Col, Row, Button, Table, Form, InputGroup } from "react-bootstrap";
import { addReading, removeReadingWithTime, selectCurReadingID, setGatheringData, selectCurId, selectReports } from '../../reports/reportsSlice';
import { selectInfiltrometerData, selectInitialVolume, selectTimeInterval } from '../../reused-components/reused-slices/initializeSlice';
import { selectLastVolume, setLastVolume, setSecondsElapsed, setVolume } from '../../reused-components/reused-slices/replicationSlice';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGeoDataToReading } from "../../useful-functions/usefulFunctions";
import { useState } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { RiErrorWarningFill as ErrorMark } from 'react-icons/ri';
export const StandardReplicationTable = ({ intervals }) => {

    const timeInterval = useSelector(selectTimeInterval);

    const curInfiltrometerData = useSelector(selectInfiltrometerData);
    const initialVolume = curInfiltrometerData.initialVolume;

    const header = () => (
        <>
            <th>Time (s)</th>
            <th>Volume (mL)</th>
        </>

    );


    const rowData = () => {
        var data = [{ time: 0, volume: initialVolume }];

        for (var i = 1; i < intervals; i++) {
            data = [...data, { time: timeInterval * i, volume: null }];
        }


        return data;
    };


    const body = () => {

        const initial = () => {
            return (
                <tr>
                    <td>0</td>
                    <td>{initialVolume}</td>
                </tr>
            );

        }

        return (
            <>
                {rowData().map(row => row.time === 0 ? initial() : <StandardReplicationRow time={row.time} />)}
            </>

        );
    }


    return (
        <Container>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                {header()}
                            </tr>
                        </thead>
                        <tbody>
                            {body()}
                        </tbody>
                    </Table>

                </Col>
            </Row>
        </Container>
    )
}



const StandardReplicationRow = ({ time }) => {
    const curInfiltrometerData = useSelector(selectInfiltrometerData);
    const dispatch = useDispatch();
    const reports = useSelector(selectReports);
    const curReport = reports[useSelector(selectCurId)];
    const readings = curReport.readings;

    //check if the previous reading is less than this one
    function isValid() {
        if (vol === 0) return true;
        if (vol < 0) return false;
        if (time === 0) return true;

        for (let i = 0; i < readings.length; i++) {
            var reading = readings[i];
            //is this us??
            if (time == reading.secondsElapsed) {
                if (i >= 1) {
                    return (reading.volume <= readings[i - 1].volume);
                }
                else {
                    return true;
                }

            }
        }
        return false;
    }

    const [vol, setVolume] = useState(0);

    const onChange = (event) => {
        var volume = event.target.value;

        if (String(volume).length === 0 || volume == undefined) {
            dispatch(removeReadingWithTime(time));
            return;
        }
        dispatch(addReading({
            volume,
            secondsElapsed: time,
            lat: curInfiltrometerData.coordinates.lat,
            lon: curInfiltrometerData.coordinates.lon
        }));
        setVolume(volume);
    }


    return (

        <tr>
            <td>{time}</td>
            <td>

                <InputGroup>

                    <Form.Control
                        autoFocus
                        id={"volume" + time}
                        type="number"
                        step="any"
                        size="sm"
                        min="0"
                        defaultValue={null}
                        placeholder="Volume (mL)"
                        onChange={onChange}
                        onSubmit={null}

                    />
                    {isValid() ? null : <ErrorMark />}
                </InputGroup>
            </td>
        </tr>
    );
}