import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Modal, Form, Alert, Row } from 'react-bootstrap';
import { selectCurId, selectReports, addReading, removeReadingWithTime } from "../../reports/reportsSlice";
import { findAverageRate, findSeverityRating, findRate } from '../../reports/reportsDataPackager';
import { selectInfiltrometerData } from '../../reused-components/reused-slices/initializeSlice';
import { Protocols } from '../../reports/protocols';
const Table = ({ protocol, editable }) => {
    const rawReports = useSelector(selectReports);
    const curInfiltrometerData = useSelector(selectInfiltrometerData);
    const dispatch = useDispatch();
    const curReport = rawReports[useSelector(selectCurId)];
    const [state] = useState(filterReadings());
    const [curVolume, setCurVolume] = useState(0);
    const [modalData, setModalData] = useState(
        {
            visible: false,
            curTime: 0,
            curVolume: 0,
            curId: 0
        }
    )
    // Create an array to use for a table row from reading data
    function filterReadings() {
        if (curReport === undefined) return { reports: [] };

        let readingsArr = [];
        for (let i = 0; i < curReport.readings.length; i++) {
            readingsArr[i] = {
                id: i,
                Time: curReport.readings[i].secondsElapsed,
                Volume: curReport.readings[i].volume,
                Rate: findRate(i, curReport, protocol === Protocols.Standard)
            };
        }
        return { reports: readingsArr };
    }

    // Map state to table elements
    function renderTableData() {
        return filterReadings().reports.map((report, index) => {
            const { id, Time, Volume, Rate } = report //destructuring

            if (protocol === Protocols.Baer) {
                return (
                    <tr key={id} onClick={
                        () => {
                            if (!editable) return;
                            setModalData({ curTime: Time, curVolume: Volume, curId: id, visible: true })
                            setCurVolume(Volume);


                        }
                    }>
                        <td>{id}</td>
                        <td>{Time}</td>
                        <td>{Volume}</td>
                        <td>{Rate.toPrecision(4)}</td>
                    </tr>
                )
            } else {
                return (
                    <tr key={id} onClick={
                        () => {
                            if (!editable) return;
                            setModalData({ curTime: Time, curVolume: Volume, curId: id, visible: true });
                            setCurVolume(Volume);

                        }
                    }>
                        <td>{id}</td>
                        <td>{Time}</td>
                        <td>{Volume}</td>
                    </tr>
                )
            }
        })
    }

    // Create table header
    function renderTableHeader() {
        try {
            let header = Object.keys(state.reports[0])
            return header.map((key, index) => {
                if (key.toUpperCase() === "ID") {
                    return <th key={index}>{key.toUpperCase()}</th>
                }
                if (key.toUpperCase() === "TIME") {
                    return <th key={index}>{key.toUpperCase() + " (s)"}</th>
                }
                if (key.toUpperCase() === "VOLUME") {
                    return <th key={index}>{key.toUpperCase() + " (mL)"}</th>
                }
                if (protocol === Protocols.Baer) {
                    if (key.toUpperCase() === "RATE") {
                        return <th key={index}>{key.toUpperCase() + " (mL/min)"}</th>
                    }
                } else {
                    return;
                }

                return <th key={0} className="text-center">No Readings To Display</th>;
            })
        }
        catch (e) {
            return <th key={0} className="text-center">No Readings To Display</th>;
        }

    }

    // Handle submit of modal
    const handleSubmit = (event) => {
        let newVolume = document.getElementById("newVolume");
        event.preventDefault();
        if (event.currentTarget.checkValidity() === true) {
            setModalData({ visible: false });
            if (String(newVolume.value).length === 0 || newVolume.value === null || newVolume.value === undefined) {
                dispatch(removeReadingWithTime(modalData.curTime));
                return;
            }
            else {
                dispatch(addReading({
                    volume: modalData.curVolume,
                    secondsElapsed: modalData.curTime,
                    lat: curInfiltrometerData.coordinates.lat,
                    lon: curInfiltrometerData.coordinates.lon
                }));
            }
        }
        else return;
    }

    return (
        <Container>
            <Row>
                <table class="table table-light table-striped table-hover" id='students'>
                    <tbody>
                        <tr class="table-dark">{renderTableHeader()}</tr>
                        {renderTableData()}
                    </tbody>
                </table>
                {protocol === Protocols.Baer ?
                    <table class="table table-light table-striped table-hover">
                        <tbody>
                            <tr class="table-dark">
                                <th class="text-center">AVERAGE (mL/min)</th>
                                <th className="text-center">SEVERITY RATING</th>
                            </tr>
                            <tr class="table-striped">
                                <td className="text-center">{findAverageRate(curReport).toPrecision(4)}</td>
                                <td class="text-center">{findSeverityRating(findAverageRate(curReport)).name}</td>
                            </tr>
                        </tbody>
                    </table>
                    : null}
            </Row>

            <Modal show={modalData.visible}>
                <Modal.Header>
                    <Modal.Title>Enter New Volumetric Data</Modal.Title>
                </Modal.Header>
                <Form validated onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Text>Current time: {modalData.curTime} s</Form.Text>
                        <br></br>
                        <Form.Text>Current volume: {curVolume} mL</Form.Text>
                        <Form.Control
                            id="newVolume"
                            type="number"
                            placeholder="New volume"
                            min="0"
                            defaultValue=""
                            onChange={() => setModalData({ ...modalData, curVolume: document.getElementById("newVolume").value })}
                        />
                        {
                            // Why are there two checks?
                            // document.getElementById("newVolume") doesn't exist until the modal is rendered.
                            // If you try to read the value of an element that doesn't exist, compiler will throw an error.
                            // So, first check if the element exists. Then, if it does, check if its empty.
                            !document.getElementById("newVolume") ?
                                <Alert variant="danger" className="text-center mt-3">Submitting an empty value will remove this table entry!</Alert>
                                :
                                document.getElementById("newVolume").value === "" ?
                                    <Alert variant="danger" className="text-center mt-3">Submitting an empty value will remove this table entry!</Alert>
                                    :
                                    null
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setModalData({ ...modalData, visible: false })}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                        >
                            {!document.getElementById("newVolume") || document.getElementById("newVolume").value === "" ? "Delete Reading" : "Save Changes"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    )
}
Table.defaultProps = {
    protocol: Protocols.Baer, editable: false
}

export default Table