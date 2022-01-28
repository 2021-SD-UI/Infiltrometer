//The Page we are displaying for the baer Initialize view
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from "react-redux";
import Table from '../../baer/baer-results/table';
import { Protocols } from '../../reports/protocols';
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import { ResultsViewButtons } from '../../reused-components/results-views/ResultsViewButtons';
import { ResultsViewNotes } from '../../reused-components/results-views/ResultsViewNotes';
import ConductivityGraph from './ConductivityGraph';
const StandardResultsView = () => {


  const reports = useSelector(selectReports);
  const curReport = reports[useSelector(selectCurId)];

  return (
    <Container className="mt-3">
      <div class="rounded border shadow">
        <h1 className="pt-5 display-4">Results</h1>
        <Row className="mt-4">
          <Col>
            <Table>{/* This table is rendered from table.js */}</Table>
          </Col>
        </Row>
        <ResultsViewNotes />
        <ConductivityGraph />
        <ResultsViewButtons protocol={Protocols.Standard} />
      </div>
    </Container>
  );
}
export default StandardResultsView;