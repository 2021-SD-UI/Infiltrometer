//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import Table from "./table";
import { setPage } from '../../page-redirection/redirector-slice';
import { CSVLink } from "react-csv";
import { makeCSV } from "../../reports/reportsDataPackager";
import TextareaAutosize from 'react-textarea-autosize';
import { selectNotes, setNotes } from "../../reports/reportsSlice";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const BaerResultsView = () => {

  const reports = useSelector(selectReports);
  const curReport = reports[useSelector(selectCurId)];
  const notes = useSelector(selectNotes);

  const dispatch = useDispatch();
  const [state, setState] = useState(notes);
  const changeNotes = (event) => {
    dispatch(setNotes(event));
    setState(event);
  }
  useEffect(() => setState(notes), []);
  
  return (
      <Container className="mt-3">
        <div class="rounded border shadow">
          <h1 className="pt-5 display-4">Results</h1>
          <Row className="mt-4">
            <Col>
              <Table>{/* This table is rendered from table.js */}</Table>
            </Col>
          </Row>
          <Row className="justify-content-center mb-5">
            <Col xs={11}>
              <Form.Label as="h4">Notes</Form.Label>
              <TextareaAutosize className="w-100" value={state} onChange={(e) => changeNotes(e.target.value)}/>
            </Col>
          </Row>
          <Row className="my-2 text-center">
            <Col>
              <Button
                variant="dark"
                className="w-50"
                size="lg"
                onClick={() => dispatch(setPage("/Infiltrometer/baer-initialize"))}
              >
                New Test
              </Button>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <Button
                variant="secondary"
                className="w-50"
                size="lg"
                onClick={() => dispatch(setPage("/Infiltrometer/reports"))}
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
        </div>
      </Container>
  );
}
export default BaerResultsView;