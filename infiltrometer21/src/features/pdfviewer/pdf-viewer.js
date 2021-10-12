import React, { useEffect, useState } from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SinglePagePDFView(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}) {
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

    const {pdf} = props
    
    return (
        <div class="container-fluid">
            
            <div class = "row mt-2"/>
            <div class = "row text-center">
                <div class = "col-sm-4"></div>
                <div class = "col-sm-4" >
                      <Document
                    file={pdf}
                    options = {{workerSrc :"/pdf.worker.js"}}
                    onLoadSuccess = {onDocumentLoadSuccess}
                    >
                    <Page pageNumber= {pageNumber}/>
                    </Document>
                </div>
                <div class = "col-sm-4" ></div>
                <div class = "row mt-2"/>
                <div class = "row">
                    <p>
                        Page {pageNumber || (numPages ? 1 :"--")} of {numPages || "--"}
                    </p>
                    <div class = "col-2"></div>
                    <div class = "col-8">
                        <button type="button" class="btn btn-secondary w-25" disabled ={pageNumber<=1} onClick={previousPage}>
                            Previous
                        </button>
                        <button type="button" class="btn btn-dark w-25" disabled={pageNumber>=numPages} onClick ={nextPage}>
                            Next
                        </button>
                    </div>
                    <div class = "col-2"></div>
                
                </div>
            </div>
            
            
        </div>

    
    );
}