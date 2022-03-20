import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../page-redirection/redirector-slice";
import { Protocols } from "./protocols";
import { removeReport, selectReports, setCurId } from "./reportsSlice";
import { CSVLink } from "react-csv";
import { makeCSVFromGroupOfReports } from "./reportsDataPackager";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table, Alert } from "react-bootstrap";
import { Pages } from "../page-redirection/Redirector";
import { deleteAllPhotos } from "../photos/albumsSlice";

const ReportsTable = () => {
    const [selectedReports, setSelectedReports] = useState({});
    const numberOfSelectedReports = Object.keys(selectedReports).length;
    const reports = useSelector(selectReports);
    const dispatch = useDispatch();

    // Map the current state to table elements
    function renderTableData() {
        return Object.keys(reports).map(reportID => {
            const report = reports[reportID]
            return (
                <>
                    <tr key={report.id}>
                        <td key={report.id}>
                            <Container className="my-2">
                                <Row>
                                    <Col>
                                        <Form>
                                            <Form.Check
                                                label={formatDate(report.date)}
                                                checked={selectedReports[report.id] !== undefined}
                                                onChange={() => {
                                                    if (selectedReports[report.id] !== undefined) {
                                                        deselectReport(report);
                                                    }
                                                    else {
                                                        selectReport(report);
                                                    }

                                                }
                                                }
                                            />
                                        </Form>

                                    </Col>
                                </Row>
                            </Container>
                        </td>
                        <td>
                            <Container className="my-2">
                                <Row>
                                    {report.protocol}
                                </Row>
                            </Container>
                        </td>
                        <td>
                            <Container className="my-2">
                                <Row>
                                    {report.infiltrometerData.site}
                                </Row>
                            </Container>
                        </td>
                        <td>
                            <Container>
                                <Row>
                                    <Col>
                                        <Button
                                            variant="dark"
                                            className="w-100 my-1"
                                            onClick={() => { showReport(report) }}
                                        >
                                            View
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Button
                                            variant="danger"
                                            className="w-100 my-1"
                                            onClick={() => { deleteReport(report) }}
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </td>
                    </tr>
                </>
            )
        })
    }

    // Removes a report from the selected reports
    function deselectReport(report) {
        var _repo = { ...selectedReports };
        delete _repo[report.id];
        setSelectedReports(_repo);
    }

    // Deselects and deletes a report
    function deleteReport(report) {
        // Delete the report from selected if it is in selected
        if (selectedReports[report.id] !== undefined) deselectReport(report);
        // Delete all the photos on this report
        dispatch(deleteAllPhotos({ reportId: report.id }));
        // Remove the report from the store
        dispatch(removeReport(report.id))
    }

    // Deselects and deletes all the currently selected reports
    function deleteAllSelected() {
        let selected = { ...selectedReports };
        let reportKeys = Object.keys(selected);
        for (var i = 0; i < reportKeys.length; i++) {
            deleteReport(selected[reportKeys[i]]);
        }
        unselectAll();
    }

    // Adds the report to the selected reports
    function selectReport(report) {
        var _repo = { ...selectedReports };
        _repo[report.id] = report;
        setSelectedReports(_repo);
    }

    // Adds all reports to the selected reports
    function selectAll() {
        let reportKeys = Object.keys(reports);
        var _repo = { ...selectedReports };
        for (var i = 0; i < reportKeys.length; i++) {
            _repo[reportKeys[i]] = reports[reportKeys[i]];
        }
        setSelectedReports(_repo);
    }

    // Removes all reports from the selected reports
    function unselectAll() {
        let reportKeys = Object.keys(reports);
        var _repo = { ...selectedReports };
        for (var i = 0; i < reportKeys.length; i++) {
            delete _repo[reportKeys[i]];
        }
        setSelectedReports(_repo);
    }

    // Sets the page to the result view of the current report
    function showReport(report) {
        switch (report.protocol) {
            case Protocols.Baer:
                dispatch(setCurId(report.id));
                dispatch(setPage(Pages.BaerResultsView));

                break;
            case Protocols.Standard:
                dispatch(setCurId(report.id));
                dispatch(setPage(Pages.StandardResultsView));
                break;
            default:
                break;

        }

    }

    // Renders dates for the Reports table
    function formatDate(date) {
        let d = new Date(date);
        if (d.toDateString() === new Date().toDateString()) {
            return "Today";
        }
        return (d.toDateString());
    }


    // Create header for table
    function renderTableHeader() {
        let header = ['Date', 'Protocol', 'Site', 'Options'];
        return header.map((key, index) => {
            console.log(key.toUpperCase())
            if (key.toLowerCase() === "site") {
                return <th class="table-dark text-center" key={index}>Site</th>
            }
            if (key.toLowerCase() === "date") {
                return <th class="table-dark text-center" key={index}>Date</th>
            }
            if (key.toLowerCase() === "protocol") {
                return <th class="table-dark text-center" key={index}>Protocol</th>
            }
            if (key.toLowerCase() === "options") {
                return <th class="table-dark text-center" key={index}>Options</th>
            }
            return null;
        })
    }

    // Conditional renderer for the download and delete buttons that require selecting
    // If no reports are selected, render disabled buttons. Otherwise, render enabled buttons
    function SelectButtons() {

        if (numberOfSelectedReports > 0) {
            return (
                <>
                    <Col className="m-2 col-6 col-md-3 col-lg-2 text-center">
                        <Button
                            variant="danger"
                            className="w-100"
                            onClick={() => { deleteAllSelected() }}
                        >
                            Delete ({numberOfSelectedReports})
                        </Button>
                    </Col>

                    <Col className="m-2 col-6 col-md-3 col-lg-2 text-center">
                        <CSVLink {...makeCSVFromGroupOfReports(selectedReports)} class="btn btn-success w-100">
                            Download ({numberOfSelectedReports})
                        </CSVLink>
                    </Col>
                </>
            );
        }
        else {
            return (
                <>
                    <Col className="m-2 col-6 col-md-3 col-lg-2 text-center">
                        <Button
                            disabled
                            variant="secondary"
                            className="w-100"
                        >
                            Delete ({numberOfSelectedReports})
                        </Button>
                    </Col>

                    <Col className="m-2 col-6 col-md-3 col-lg-2 text-center">
                        <Button
                            disabled
                            variant="secondary"
                            className="w-100"
                        >
                            Download ({numberOfSelectedReports})
                        </Button>
                    </Col>
                </>
            );
        }


    }
    // Only render the Reports table if there are reports in the first place
    if (Object.keys(reports).length > 0) {
        return (
            <Container className="mt-3">
                <div class="rounded border shadow">
                    <h1 className="my-5 display-4">Reports</h1>
                    <Row className="justify-content-center m-2">
                        <Col className="m-2 col-6 col-md-3 col-lg-2 text-center">
                            <Button
                                variant="dark"
                                className="w-100"
                                onClick={() => { selectAll() }}
                            >
                                Select All
                            </Button>
                        </Col>
                        <Col className="m-2 col-6 col-md-3 col-lg-2 text-center">
                            <Button
                                variant="secondary"
                                className="w-100"
                                onClick={() => { unselectAll() }}
                            >
                                Unselect All
                            </Button>
                        </Col>
                        <SelectButtons />
                    </Row>
                    <Row className="m-3">
                        <Col>
                            <Table light striped bordered hover id='students'>
                                <tbody>
                                    <tr>{renderTableHeader()}</tr>
                                    {renderTableData()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
    else {
        return (
            <Container className="mt-3">
                <div class="rounded border shadow">
                    <Row>
                        <h1 className="display-4">No Saved Reports</h1>
                    </Row>
                    <Row className="justify-content-center">
                        <Alert variant="danger w-50" className="text-center">Click "New Test" to start creating a report.</Alert>
                    </Row>
                </div>
            </Container>
        )
    }
}
export default ReportsTable;