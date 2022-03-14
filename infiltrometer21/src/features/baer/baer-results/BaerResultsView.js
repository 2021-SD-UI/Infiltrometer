//The Page we are displaying for the baer Initialize view
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Protocols } from '../../reports/protocols';
import { ResultsViewButtons } from '../../reused-components/results-views/ResultsViewButtons';
import { ResultsViewNotes } from '../../reused-components/results-views/ResultsViewNotes';
import { ResultsViewPhotos } from '../../reused-components/results-views/ResultsViewPhotos';
import Table from "./table";

const BaerResultsView = () => {

  return (
    <Container className="mt-3">
      <div class="rounded border shadow">
        <h1 className="pt-4 display-4">Results</h1>
        <Row className="mt-4">
          <Col>
            <Table>{/* This table is rendered from table.js */}</Table>
          </Col>
        </Row>
        <ResultsViewNotes />
        <ResultsViewPhotos />
        <ResultsViewButtons protocol={Protocols.Baer} />

      </div>
    </Container>
  );
}
export default BaerResultsView;