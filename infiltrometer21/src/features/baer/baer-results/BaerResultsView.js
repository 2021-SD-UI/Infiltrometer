//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import Table from "./table";
import { setPage } from '../../page-redirection/redirector-slice';
import { CSVLink } from "react-csv";
import { makeCSV } from "../../reports/reportsDataPackager";
import TextareaAutosize from 'react-textarea-autosize';
import { selectNotes, setNotes } from "../../reports/reportsSlice";

const BaerResultsView = () => {

  const reports = useSelector(selectReports);
  const curReport = reports[useSelector(selectCurId)];
  const notes = useSelector(selectNotes);

  const dispatch = useDispatch();
  const [state, setState] = useState(notes);
  const changeNotes = (event) => {
    dispatch(setNotes(event));
    setState(event);
  }
  useEffect(() => setState(notes), []);
  return (<div class="container-fluid">
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8 text-center">
        <div class="display-4">Results</div>

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

    <div class="row">

      <div class="col-sm-2"></div>
      <div class="col-sm-8 text-center mb-2">

        <div class="container">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8 text-center">
              <div class="display-6">Notes</div>

            </div>
            <div class="col-2"></div>
          </div>


          <TextareaAutosize className="row" class="w-100" value={state} onChange={(e) => changeNotes(e.target.value)} />
        </div>
      </div>
      <div class="col-sm-2"></div>

    </div>

    <div class="container">
      <div class="row">
        <div class="col-2"></div>
        <div class="col text-center">
          <div class="btn btn-dark w-50" onClick={
            () => dispatch(setPage("/Infiltrometer/baer-initialize"))
          }>
            New Test
          </div>
          <div class="row mt-2"></div>


          <div class="btn btn-secondary w-50" onClick={
            () => dispatch(setPage("/Infiltrometer/reports"))
          }>
            Reports
          </div>
          <div class="row mt-4"></div>
          <CSVLink {...makeCSV(curReport)} class="btn btn-success w-25">
            Download
          </CSVLink>

        </div>
        <div class="col-2"></div>
      </div>
    </div>

  </div>);
}
export default BaerResultsView;