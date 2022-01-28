import { useSelector } from "react-redux";
import { soilTypes } from "../../../app/soilTypes";
import { Protocols } from "../../reports/protocols";
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import React from "react";
const ConductivityGraph = () => {

    const reports = useSelector(selectReports);

    //Use this report to display graph data
    const curReport = reports[useSelector(selectCurId)];



    //checks if the values in the cure report are valid for creating a conductivity graph
    const validValues = () => {
        //don't render if the following are true
        if (curReport.protocol !== Protocols.Standard) return false;
        if (curReport.infiltrometerData.radius == undefined || curReport.infiltrometerData.radius < 0) return false;
        if (curReport.infiltrometerData.soilType == soilTypes.undefined) return false;


        //show graph here, data is valid
        return true;
    }

    return (<>{validValues ? "The values are valid" : "The values are not valid!"}</>);
}


export default ConductivityGraph;