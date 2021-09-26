//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import {selectReports} from "../reports/reportsSlice";
import {selectLastVolume} from "../baer-replication/bear-replicationSlice";
import {selectInfiltrometerData} from "../baer-initialize/bear-initializeSlice";


const  BaerResultsView = ()=> {
  const infiltrometerData = useSelector(selectInfiltrometerData);
  const reports = useSelector(selectReports);
  const lastVolume = useSelector(selectLastVolume);
  console.log(reports);
  console.log(lastVolume);
  console.log(infiltrometerData);
console.log(reports[0].readings[0].volume);



  function makeTableBody(reports,i){

      return (
          <tr>
            <td>{reports[0].readings[i].volume}</td>
            <td>{reports[0].readings[i].secondsElapsed}</td>
          </tr>
      )
  }


  return (<div class="container-fluid">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-9 text-lg-center">
          <h1>Bear Results View</h1>

        </div>
        <div class="col-sm-1"></div>
      <Link to ="/Infiltrometer/baer-initialize">To Initialize View</Link>
      </div>
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-9">
          <div class="container">
            <table className={"table border-secondary"}>
              <thead class="table-dark">
                <tr>
                  <th>Volume</th>
                  <th>Seconds Elapsed</th>
                </tr>
              </thead>
              <tbody>
                  {makeTableBody(reports,0)}
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-sm-1"></div>
      </div>
    </div>);
}
export default BaerResultsView;