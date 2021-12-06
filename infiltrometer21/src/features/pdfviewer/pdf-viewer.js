
import React, { useState } from 'react';
import { Container, Alert, Row, Button } from 'react-bootstrap';

export const PdfViewer = ({ pdf }) => {
    //  const pageNumber = pdfjs.getNumPages(pdf);
    return (

        <>
            <Container>
                <object>
                    <iframe src={pdf} width="100%" height="1024"></iframe>
                </object>
                <Row className="justify-content-center mt-2">
                    <Button href={pdf} variant="dark w-50">
                        View PDF
                    </Button>
                </Row>
            </Container>
        </>
    );
}
