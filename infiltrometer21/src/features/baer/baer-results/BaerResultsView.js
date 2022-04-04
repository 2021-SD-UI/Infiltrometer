//The Page we are displaying for the baer Initialize view
import React from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { Protocols } from '../../reports/protocols';
import { ResultsViewButtons } from '../../reused-components/results-views/ResultsViewButtons';
import { ResultsViewNotes } from '../../reused-components/results-views/ResultsViewNotes';
import { ResultsViewPhotos } from '../../reused-components/results-views/ResultsViewPhotos';
import Table from "./table";

const BaerResultsView = () => {

  return (
    <Container className="mt-5">
      <div class="rounded border shadow">
        <h1 className="mt-5 display-4">Results</h1>
        <Row className="mt-5">
          <Col>
            <Table protocol={Protocols.Baer} editable>{/* This table is rendered from table.js */}</Table>
          </Col>
        </Row>
        <Container>
          <Row className="justify-content-center">
            <Col>
              <Alert variant="info" className="text-center">Need to change volume data? Tap corrosponding table entries to edit.</Alert>
            </Col>
          </Row>
        </Container>
        <ResultsViewNotes />
        <ResultsViewPhotos />
        <ResultsViewButtons protocol={Protocols.Baer} />

      </div>
    </Container>
  );
}
export default BaerResultsView;