
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
                <object>
                    <embed src={pdf} width="100%" margin={0} overflow="auto" height="1024"></embed>
                </object>
            </Container>
        </>
    );
}
