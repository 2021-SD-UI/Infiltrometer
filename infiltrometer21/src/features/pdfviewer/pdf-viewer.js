import React, { useEffect, useState } from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SinglePagePDFView(props) {
    
    let {pdf, reload} = props
    
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}) {
        
        if (reload){
           
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
        <div class="container">
            <div class = "row mt-2"/>
            <div class = "row text-center">
                <div class = "col-4"></div>
                <div class = "col-4" >
                      <Document
                    file={pdf}
                    options = {{workerSrc :"/pdf.worker.js"}}
                    onLoadSuccess = {onDocumentLoadSuccess}
                    >
                    <Page pageNumber= {pageNumber}/>
                    
                    </Document>
                </div>
                <div class = "col-4" ></div>
                <div class = "row mt-2"/>
                <div class = "row">
                    <p>
                        Page {pageNumber || (numPages ? 1 :"--")} of {numPages || "--"}
                    </p>
                   <div class = "col-2"/>
                    <div class = "col">
                        <button type="button" class="btn btn-secondary w-100" disabled ={pageNumber<=1} onClick={previousPage}>
                            Previous
                        </button>
                    </div>
                    <div class = "col-2"/>
                    <div class = "col">
                        <button type="button" class="btn btn-dark w-100" disabled={pageNumber>=numPages} onClick ={nextPage}>
                            Next
                        </button>
                    </div>
                    <div class = "col-2"/>
                </div>
                <div class = "row mt-"/>
            </div>
            
            
        </div>

    
    );
}