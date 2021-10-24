//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import {selectCurId, selectReports} from "../../reports/reportsSlice";
import Table from "./table";
import { setPage } from '../../page-redirection/redirector-slice';
import {CSVLink} from "react-csv";
import {makeCSV} from "../../reports/reportsDataPackager";
const  BaerResultsView = ()=> {
  const reports = useSelector(selectReports);
  const curReport = reports[useSelector(selectCurId)];
  const dispatch = useDispatch();

  return (<div class="container-fluid">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8 text-center">
          <h1>Baer Results View</h1>

        </div>
        <div class="col-sm-2"></div>

      </div>
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <div class="container">
              <Table></Table>
          </div>
        </div>
        <div class="col-sm-2"></div>
      </div>
      <div class="container">
        <div class="row">
          <div class = "col-2"></div>
          <div class="col text-center">
              <div class="btn btn-dark w-50" onClick ={
                ()=>dispatch(setPage("/Infiltrometer/baer-initialize"))
                }>  
                New Test
              </div>
              <div class = "row mt-2"></div>
           
              
              <div class="btn btn-secondary w-50" onClick ={
                ()=>dispatch(setPage("/Infiltrometer/reports"))
                }>
                Reports
              </div>
              <div class = "row mt-4"></div>
              <CSVLink {...makeCSV(curReport)} class="btn btn-success w-25">
                  Download
              </CSVLink>

          </div>
          <div class = "col-2"></div>
        </div>
      </div>
 
    </div>);
}
export default BaerResultsView;