//The Page we are displaying for the baer Initialize view
import React, { useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { Protocols } from '../../reports/protocols';
import { ResultsViewButtons } from '../../reused-components/results-views/ResultsViewButtons';
import { ResultsViewNotes } from '../../reused-components/results-views/ResultsViewNotes';
import { ResultsViewPhotos } from '../../reused-components/results-views/ResultsViewPhotos';
import Table from "./table";

const BaerResultsView = () => {
  const [show, setShow] = useState(true);

  return (
    <Container className="mt-4 p-3 rounded border shadow">
        <h1 className="mb-4 display-4">Results</h1>
        <Row>
          <Col>
            <Table protocol={Protocols.Baer} editable>{/* This table is rendered from table.js */}</Table>
          </Col>
        </Row>
        <Container>
          <Row className="justify-content-center">
            <Col>
              <Alert show={show} onClose={() => setShow(false)} variant="info" dismissible className="text-center">Need to change volume data? Tap corrosponding table entries to edit.</Alert>
            </Col>
          </Row>
        </Container>
        <ResultsViewNotes />
        <ResultsViewPhotos />
        <ResultsViewButtons protocol={Protocols.Baer} />
    </Container>
  );
}
export default BaerResultsView;