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

  function makeTable(report) {
    return (
    <div>
      {reports[0].readings[0]}
    </div>


  )
  }


  return (<div>
    <div>
      Bear Results View
    </div>
      <Link to ="/Infiltrometer/baer-initialize">To Initialize View</Link>
    {makeTable(reports)}
    {reports.date}
    </div>);
}
export default BaerResultsView;