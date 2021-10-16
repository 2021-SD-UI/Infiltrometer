import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../page-redirection/redirector-slice";
import { Protocols } from "./protocols";
import { removeReport, selectReports, setCurId } from "./reportsSlice";

const ReportsTable = () =>{
    const reports = useSelector(selectReports);
    const dispatch = useDispatch();

    /**
     * map state to table elements
     */
    function renderTableData() {
        return Object.keys(reports).map(reportID => {

            const report = reports[reportID]
            return (
                <tr key={report.id} >
                    <td onClick = {()=>showReport(report)}>{report.date}</td>
                    <td>{report.protocol}</td>
                    <td class="btn btn-dark"
                    onClick = {()=>dispatch(removeReport(report.id))} >Delete Report</td>
                </tr>
            )
        })
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

    /**
     * create header for table
     */
    function renderTableHeader() {
        let header = ['Date','Protocol' , 'Delete'];
        return header.map((key, index) => {
            console.log(key.toUpperCase())
            if (key.toLowerCase() === "protocol") {
                return <th key={index}>Protocol</th>
            }
            if (key.toLowerCase() === "date") {
                return <th key={index}>Date</th>
            }
            if (key.toLowerCase() == "delete"){
                return <th key={index}>Delete</th>
            }
           
        })
    }

     //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div class = "container">
                <div class = "row mt-2" ></div>
                <div class = "row">
                    <div class = "col-2"></div>
                    <div class = "col-8">
                        <table class="table table-light table-striped table-hover" id='students'>
                            <tbody>
                            <tr class="table-dark">{renderTableHeader()}</tr>
                            {renderTableData()}
                            </tbody>
                        </table>
                    </div>
                    <div class = "col-2"></div>
                </div>
            </div>
        )
}
export default ReportsTable;