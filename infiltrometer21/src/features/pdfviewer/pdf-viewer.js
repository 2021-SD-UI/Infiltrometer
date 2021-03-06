import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';

export const PdfViewer = ({ pdf }) => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const previousPage = (event) => {
        event.preventDefault();
        changePage(-1);
    }
    const nextPage = (event) => {
        event.preventDefault();
        changePage(1);
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function setPDFScale() {
        if (window.screen.width < 450)
            return 0.6;
        else
            return 1;
    }

    return (
        <>
            <Container className="mt-4 p-3 rounded border shadow">
                <h1 className="mb-4 display-4">Manuals</h1>
                <Row>
                    <Col></Col>
                    <Col>
                        <Document
                            className="text-center"
                            file={pdf}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page
                                pageNumber={pageNumber}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                                scale={setPDFScale()}
                                loading={
                                    // This prevents the webpage
                                    // from scrolling back to the top
                                    // when you change PDF page numbers
                                    <Page pageNumber={1}></Page>
                                }
                            />
                            <Container className="rounded border shadow">
                                <Row><Form.Label>Page {pageNumber} of {numPages}</Form.Label></Row>
                                <Row className="pb-3 text-center">
                                    <Col>
                                        <Button
                                            variant="secondary"
                                            className="w-75"
                                            disabled={pageNumber <= 1}
                                            onClick={previousPage}
                                        >
                                            Previous
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="dark"
                                            className="w-75"
                                            disabled={pageNumber >= numPages}
                                            onClick={nextPage}
                                        >
                                            Next
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Document>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
}
