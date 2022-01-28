import { useSelector } from "react-redux";
import { soilTypes } from "../../../app/soilTypes";
import { Protocols } from "../../reports/protocols";
import { selectCurId, selectReports } from "../../reports/reportsSlice";

const ConductivityGraph = () => {

    const reports = useSelector(selectReports);

    //Use this report to display graph data
    const curReport = reports[useSelector(selectCurId)];

    const createGraph = () => {
        //don't render if the following are true
        if (curReport.protocol !== Protocols.Standard) return null;
        if (curReport.infiltrometerData.radius == null || curReport.infiltrometerData.radius < 0) return null;
        if (curReport.infiltrometerData.soilType == soilTypes.undefined) return null;


        //show graph here, data is valid
        return (
            <div>
                Valid!!
            </div>);
    }

    return (<>{createGraph}</>);
}


export default ConductivityGraph;