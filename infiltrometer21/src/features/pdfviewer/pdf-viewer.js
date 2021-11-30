import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SinglePagePDFView(props) {

    let { pdf, reload } = props

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [value, setValue] = useState(1);
    const [finalValue, setFinalValue] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {

        if (reload) {

            previousPage(); nextPage(); reload = false;
        }
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
                            <Document
                                class="text-center"
                                file={pdf}

                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} />

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
                                <Form.Label>Page {pageNumber} of {numPages}</Form.Label>
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