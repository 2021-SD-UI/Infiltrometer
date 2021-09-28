//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import {selectReports} from "../reports/reportsSlice";
import Table from "./table";


const  BaerResultsView = ()=> {
  const reports = useSelector(selectReports);


  return (<div class="container-fluid">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8 text-lg-center">
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
      <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 text-lg-center">
              <Link class="btn btn-dark" to ="/Infiltrometer/baer-initialize">New Test</Link>
          </div>
          <div className="col-sm-2"></div>
      </div>
    </div>);
}
export default BaerResultsView;