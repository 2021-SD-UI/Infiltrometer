import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../page-redirection/redirector-slice";
import { Protocols } from "./protocols";
import { removeReport, selectReports, setCurId } from "./reportsSlice";
import {CSVLink} from "react-csv";
import {makeCSV, makeCSVFromGroupOfReports} from "./reportsDataPackager";
import {selectCurId} from "./reportsSlice";
import React, { useState } from "react";
const ReportsTable = () =>{

    const [selectedReports, setSelectedReports] = useState({});
    const numberOfSelectedReports = Object.keys(selectedReports).length;
    
    const reports = useSelector(selectReports);
    const curReport = reports[useSelector(selectCurId)]
    const dispatch = useDispatch();
    /**
     * map state to table elements
     */
    function renderTableData() {
        return Object.keys(reports).map(reportID => {

            const report = reports[reportID]
            return (
                <tr key={report.id} >
                    <td >
                        <div class = "container">
                            <div class="row">
                                <div class = "col-1">
                                    <input class="form-check-input" type="checkbox" value="" checked={selectedReports[report.id] != undefined}
                                        onClick = {
                                            ()=>{
                                                if (selectedReports[report.id] != undefined){
                                                   deselectReport(report);
                                                }
                                                else{
                                                   selectReport(report);
                                                }
                                               
                                            }
                                        }
                                        />
                                </div>
                                <div class = "col-5">
                                    {formatDate(report.date)}
                                </div>
                                
                            </div>
                        </div>
                    </td>
                    <td>{report.protocol}</td>
                    <td>
                        <div class = "container">
                            <div class = "row">
                                <div class = "col">
                                    <div class="btn btn-dark  w-100"
                                    onClick = {()=>showReport(report)}>
                                        View
                                    </div>
                                </div>
                                <div class = "col">
                                <div class="btn btn-danger  w-100"
                                    onClick = {()=>{deleteReport(report)}}>
                                    Delete
                                </div>
                            </div>
                               
                               
                               
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    /**
     * Deselects and deletes the provided report
     * @param {
     * } report 
     */
    function deleteReport(report){
        //delete the report from selected if it is in selected
        if (selectedReports[report.id]!=undefined) deselectReport(report);
                                   
        //remove the report from the store
        dispatch(removeReport(report.id))        
    }



    /**
     * Deletes all the currently selected reports
     * 
     */
    function deleteAllSelected(){
        
        let reportKeys = Object.keys(selectedReports);
        for (var i = 0; i < reportKeys.length; i++) {
            deleteReport(selectedReports[reportKeys[i]]);
        }
    }

    /**
     * Removes the report from the selected reports
     * @param {} report 
     */
    function deselectReport(report){
        var _repo = {...selectedReports};
        delete _repo[report.id];
        setSelectedReports(_repo);
    }
    /**
     * Adds the report to the selected reports
     * @param {} report 
     */
    function selectReport(report){
        var _repo = {...selectedReports};
        _repo[report.id] = report;
        setSelectedReports(_repo);
    }
    /**
     * Selects all the reports
     */
    function selectAll(){
        let reportKeys = Object.keys(reports);
        var _repo = {...selectedReports};
        for (var i = 0; i < reportKeys.length; i++) {
            _repo[reportKeys[i]] = reports[reportKeys[i]];
        }
        setSelectedReports(_repo);
    }
    /**
     * Unselects all reports
     */
    function unselectAll(){
      let reportKeys = Object.keys(reports);
        var _repo = {...selectedReports};
        for (var i = 0; i < reportKeys.length; i++) {
            delete _repo[reportKeys[i]];
        }
        setSelectedReports(_repo);
    }

    function showReport(report){
        switch(report.protocol){
            case Protocols.Baer:
                dispatch(setCurId(report.id));
                dispatch(setPage("/Infiltrometer/baer-results"));

                break;
            default:
                break;

        }
        
    }


    function formatDate(date){
        let d = new Date(date);
        if (d.toDateString() === new Date().toDateString()){
            return "Today";
        }
        return (d.toDateString());
    }

    /**
     * create header for table
     */
    function renderTableHeader() {
        let header = ['Date','Protocol' , 'Options'];
        return header.map((key, index) => {
            console.log(key.toUpperCase())
            if (key.toLowerCase() === "protocol") {
                return <th key={index}>Protocol</th>
            }
            if (key.toLowerCase() === "date") {
                return <th key={index}>Date</th>
            }
            if (key.toLowerCase() == "options"){
                return <th key={index}></th>
            }
           
        })
    }


    //see if there is any data
    if (Object.keys(reports).length > 0){
        //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div class = "container">
                <div class = "row mt-4" ></div>
                <div class = "row">
                    <div class = "col-2"></div>
                    <div class = "col-2 text-center">
                        <div class="btn btn-dark  w-100"
                            onClick = {()=>{selectAll()}}>
                            Select all
                        </div>
                    </div>
                     <div class = "col-2 text-center">
                        <div class="btn btn-secondary  w-100"
                            onClick = {()=>{unselectAll()}}>
                            Unselect all
                        </div>
                    </div>
                    <div class = "col-2 text-center">
                        <div class="btn btn-danger  w-100"
                            onClick = {()=>{deleteAllSelected()}}>
                            Delete Selected ( {numberOfSelectedReports} )
                        </div>
                    </div>
                    
                    <div class = "col-2 text-center">
                        <CSVLink {...makeCSVFromGroupOfReports(selectedReports)} class="btn btn-success w-100">
                            Download Selected ( {numberOfSelectedReports} )
                        </CSVLink>
                    </div>
                    <div class = "col-2"></div>
                </div>

                <div class = "row mt-2" ></div>
                <div class = "row">
                    <div class = "col-1"></div>
                    <div class = "col-10">
                        <table class="table table-light table-striped table-hover" id='students'>
                            <tbody>
                            <tr class="table-dark">{renderTableHeader()}</tr>
                            {renderTableData()}
                            </tbody>
                        </table>
                    </div>
                    <div class = "col-1"></div>
                </div>
                
               
            </div>
        )
    }
    else{
        return(
            <div class = "container">
                <div class = "row mt-2"></div>
                <div class = "row">
                    <div class="display-4 text-center">
                      No Saved Reports
                    </div>
                    <div class="text-center">
                        Click "New Test" to create a report.
                    </div>
                </div>
            </div>
        )
    }


     
}
export default ReportsTable;