
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Container, Col, Form, Row, Button } from 'react-bootstrap';
import FieldGuide from './FieldGuide.pdf'
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";



export const PdfViewer = ({ pdf }) => {
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(1);
    //  const pageNumber = pdfjs.getNumPages(pdf);

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
                            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page renderAnnotationLayer={false} pageNumber={pageNumber} />
                            </Document>

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
