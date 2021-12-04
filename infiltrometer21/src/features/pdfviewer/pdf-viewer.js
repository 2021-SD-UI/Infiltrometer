
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

export const PdfViewer = ({ pdf }) => {
    //  const pageNumber = pdfjs.getNumPages(pdf);
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
