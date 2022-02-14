import { Container, Col, Row, Button, Table, Form } from "react-bootstrap";
import { addReading, removeReadingWithTime, selectCurReadingID, setGatheringData } from '../../reports/reportsSlice';
import { selectInfiltrometerData, selectInitialVolume, selectTimeInterval } from '../../reused-components/reused-slices/initializeSlice';
import { selectLastVolume, setLastVolume, setSecondsElapsed, setVolume } from '../../reused-components/reused-slices/replicationSlice';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGeoDataToReading } from "../../useful-functions/usefulFunctions";


export const StandardReplicationTable = ({ intervals }) => {

    const timeInterval = useSelector(selectTimeInterval);


    const header = () => (
        <>
            <th>Time (s)</th>
            <th>Volume (mL)</th>
        </>

    );


    const rowData = () => {
        var data = [];

        for (var i = 0; i < intervals; i++) {
            data = [{ time: timeInterval * i, volume: null }, ...data,];
        }


        return data;
    };


    const body = () => {

        let rows = 10;

        return (
            <>
                {rowData().map(row => <StandardReplicationRow time={row.time} />)}
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

    useEffect(() => {
        if (time === 0) {

            //this is the initial volume

        }


    }, [])

    const onChange = (event) => {
        var volume = event.target.value;

        if (volume == "" || volume === undefined) {
            dispatch(removeReadingWithTime(time));
            return;
        }
        addGeoDataToReading({ volume, secondsElapsed: time }, (newReading) => {
            dispatch(addReading(newReading));
        });
    }


    return (
        <tr>
            <td>{time}</td>
            <td>
                <Form>
                    <Form.Group>
                        <Form.Control
                            id="volume"
                            type="number"
                            step="any"
                            size="sm"
                            min="0"
                            defaultValue={null}
                            placeholder="Volume (mL)"
                            onChange={onChange}
                            onSubmit={() => { }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </td>
        </tr>
    );
}