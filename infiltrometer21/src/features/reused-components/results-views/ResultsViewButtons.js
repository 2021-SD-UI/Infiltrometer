
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import { setPage } from '../../page-redirection/redirector-slice';
import { CSVLink } from "react-csv";
import { makeCSV } from "../../reports/reportsDataPackager";
import { Button, Col, Row } from 'react-bootstrap';
import { Pages } from '../../page-redirection/Redirector';
import { Protocols } from '../../reports/protocols';
import { selectAlbums } from '../../photos/albumsSlice';

export const ResultsViewButtons = ({ protocol }) => {
    const reports = useSelector(selectReports);
    const curReport = reports[useSelector(selectCurId)];
    const dispatch = useDispatch();
    const reportAlbums = useSelector(selectAlbums);
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
                    <Button variant="success" size="lg" className="w-50" onClick={() => { makeCSV(curReport, reportAlbums) }}>
                        Download Report
                    </Button>
                </Col>
            </Row>
        </>
    );
}