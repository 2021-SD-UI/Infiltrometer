import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Container, Col, Form, Row, Button } from 'react-bootstrap';
import FieldGuide from './FieldGuide.pdf'


pdfjs.GlobalWorkerOptions.workerSrc = '/pdfWorker.js';

export const PdfViewer = ({ pdf }) => {

    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(1);


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
    function previousPage() {
        changePage(-1);
    }
    function nextPage() {
        changePage(1);
    }
    return (

        <>
            <Container>
                <div class="rounded border shadow">
                    <h1 className="pt-2 display-4">Manuals</h1>
                    <Row className="p-3 text-center">
                        <Col></Col>
                        <Col>
                            <object data={pdf} type="application/pdf" width="100%" height="100%">
                                <p>Alternative text - include a link</p>
                            </object>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        type="range"
                                        disabled
                                        min="1"
                                        max={numPages}
                                        value={pageNumber}
                                        className="w-100"
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="pb-3 text-center">
                        <Col>
                            <Button
                                variant="secondary"
                                className="w-50"
                                disabled={pageNumber <= 1}
                                onClick={previousPage}
                            >
                                Previous
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="dark"
                                className="w-50"
                                disabled={pageNumber >= numPages}
                                onClick={nextPage}
                            >
                                Next
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
}