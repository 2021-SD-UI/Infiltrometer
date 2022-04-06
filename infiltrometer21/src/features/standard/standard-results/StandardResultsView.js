//The Page we are displaying for the baer Initialize view
import React, { useState } from 'react';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import Table from '../../baer/baer-results/table';
import { Protocols } from '../../reports/protocols';
import { ResultsViewButtons } from '../../reused-components/results-views/ResultsViewButtons';
import { ResultsViewNotes } from '../../reused-components/results-views/ResultsViewNotes';
import ConductivityForm from './ConductivityForm';
import ConductivityGraph from './ConductivityGraph';
import { ResultsViewPhotos } from '../../reused-components/results-views/ResultsViewPhotos';

const StandardResultsView = () => {
  const [show, setShow] = useState(true);

  return (
    <Container className="mt-4 p-3 rounded border shadow">
      <h1 className="mb-4 display-4">Results</h1>
      <Row>
        <Col>
          <Table protocol={Protocols.Standard} editable>{/* This table is rendered from table.js */}</Table>
        </Col>
      </Row>
      <Container>
        <Row className="justify-content-center">
          <Col>
            <Alert show={show} onClose={() => setShow(false)} variant="info" dismissible className="text-center">Need to change volume data? Tap corrosponding table entries to edit.</Alert>
          </Col>
        </Row>
      </Container>
      <ConductivityForm />
      <ConductivityGraph />
      <ResultsViewNotes />
      <ResultsViewPhotos />
      <ResultsViewButtons protocol={Protocols.Standard} />
    </Container>
  );
}
export default StandardResultsView;