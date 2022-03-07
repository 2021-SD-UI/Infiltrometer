//The Page we are displaying for the baer Initialize view
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Table from '../../baer/baer-results/table';
import { Protocols } from '../../reports/protocols';
import { ResultsViewButtons } from '../../reused-components/results-views/ResultsViewButtons';
import { ResultsViewNotes } from '../../reused-components/results-views/ResultsViewNotes';
import ConductivityForm from './ConductivityForm';
import ConductivityGraph from './ConductivityGraph';
import { ResultsViewPhotos } from '../../reused-components/results-views/ResultsViewPhotos';
const StandardResultsView = () => {

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
        <ResultsViewPhotos />
        <ConductivityForm />
        <ConductivityGraph />
        <ResultsViewButtons protocol={Protocols.Standard} />
      </div>
    </Container>
  );
}
export default StandardResultsView;