//The Page we are displaying for the baer Initialize view
import React from 'react';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import Table from '../../baer/baer-results/table';
import { Protocols } from '../../reports/protocols';
import { ResultsViewButtons } from '../../reused-components/results-views/ResultsViewButtons';
import { ResultsViewNotes } from '../../reused-components/results-views/ResultsViewNotes';
import ConductivityForm from './ConductivityForm';
import ConductivityGraph from './ConductivityGraph';
import { ResultsViewPhotos } from '../../reused-components/results-views/ResultsViewPhotos';

const StandardResultsView = () => {

  return (
    <Container className="mt-5">
      <div class="rounded border shadow">
        <h1 className="mt-5 display-4">Results</h1>
        <Row className="mt-5">
          <Col>
            <Table protocol={Protocols.Standard} editable>{/* This table is rendered from table.js */}</Table>
          </Col>
        </Row>
        <Container>
          <Row className="justify-content-center">
            <Col>
              <Alert variant="info" className="text-center">Need to change volume data? Tap corresponding table entries to edit.</Alert>
            </Col>
          </Row>
        </Container>
        <ConductivityForm />
        <ConductivityGraph />
        <ResultsViewNotes />
        <ResultsViewPhotos />
        <ResultsViewButtons protocol={Protocols.Standard} />
      </div>
    </Container>
  );
}
export default StandardResultsView;