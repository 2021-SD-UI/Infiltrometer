import { useSelector } from "react-redux";
import { selectReports } from "./reportsSlice";

const ReportsTable = () =>{
    const reports = useSelector(selectReports);
    

    /**
     * map state to table elements
     */
    function renderTableData() {
        return Object.keys(reports).map(reportID => {

            const report = reports[reportID] //destructuring
            return (
                <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.date}</td>
                </tr>
            )
        })
    }

    /**
     * create header for table
     */
    function renderTableHeader() {
        let header = ['ID', 'Date'];
        return header.map((key, index) => {
            console.log(key.toUpperCase())
            if (key.toUpperCase() === "ID") {
                return <th key={index}>{key.toUpperCase()}</th>
            }
            if (key.toUpperCase() === "DATE") {
                return <th key={index}>{key.toUpperCase()}</th>
            }
        })
    }

     //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div>
                <table class="table table-light table-striped table-hover" id='students'>
                    <tbody>
                    <tr class="table-dark">{renderTableHeader()}</tr>
                    {renderTableData()}
                    </tbody>
                </table>
            </div>
        )
}
export default ReportsTable;