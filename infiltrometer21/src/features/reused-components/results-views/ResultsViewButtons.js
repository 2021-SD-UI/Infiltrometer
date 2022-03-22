/* React/Redux Imports */
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Row } from 'react-bootstrap';

/* Slice Imports */
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import { setPage } from '../../page-redirection/redirector-slice';

/* Other Imports */
import { makeCSV } from "../../reports/reportsDataPackager";
import { Pages } from '../../page-redirection/Redirector';
import { Protocols } from '../../reports/protocols';


export const ResultsViewButtons = ({ protocol }) => {
    const reports = useSelector(selectReports);
    const curReport = reports[useSelector(selectCurId)];
    const dispatch = useDispatch();

    return (
        <>
            <hr />
            < Row className="mt-4 text-center" >
                <Col>
                    <Button
                        variant="dark"
                        className="w-50"
                        size="lg"
                        onClick={() => {
                            if (protocol === Protocols.Standard) {
                                dispatch(setPage(Pages.StandardInitializeView));
                            }
                            else if (protocol === Protocols.Baer) {
                                dispatch(setPage(Pages.BaerInitializeView));
                            }

                        }}
                    >
                        New Test
                    </Button>
                </Col>
            </Row >
            <Row className="my-2 text-center">
                <Col>
                    <Button
                        variant="secondary"
                        className="w-50"
                        size="lg"
                        onClick={() => dispatch(setPage(Pages.ReportsView))}
                    >
                        Reports
                    </Button>
                </Col>
            </Row>
            <Row className="mb-4 text-center">
                <Col>
                    <Button variant="success" size="lg" className="w-50" onClick={() => { makeCSV(curReport) }}>
                        Download Report
                    </Button>
                </Col>
            </Row>
        </>
    );
}