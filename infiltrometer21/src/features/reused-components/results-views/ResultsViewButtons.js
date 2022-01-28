
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import { setPage } from '../../page-redirection/redirector-slice';
import { CSVLink } from "react-csv";
import { makeCSV } from "../../reports/reportsDataPackager";
import { Button, Col, Row } from 'react-bootstrap';
import { Pages } from '../../page-redirection/Redirector';
import { Protocols } from '../../reports/protocols';


export const ResultsViewButtons = ({ protocol }) => {
    const reports = useSelector(selectReports);
    const curReport = reports[useSelector(selectCurId)];

    const dispatch = useDispatch();

    return (
        <>
            < Row className="my-2 text-center" >
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
            <Row className="text-center">
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
            <Row className="mt-2 mb-5 text-center">
                <Col>
                    <CSVLink
                        {/*onClick ->*/ ...makeCSV(curReport)}
                        class="btn btn-success btn-lg w-50"
                    >
                        Download Report
                    </CSVLink>
                </Col>
            </Row>
        </>
    );
}