import React, {Component, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {selectCurId, selectReports} from "../reports/reportsSlice";

const Table =()=> {
    const rawReports = useSelector(selectReports);

    const curReport = rawReports[useSelector(selectCurId)];


    const [state, setState] = useState(filterReadings());

    /**
     * Find ml/min for a reading
     * @param {The current reading index} i
     */
    function findRate(i){
        if(i>0){
            return ((curReport.readings[i-1].volume) - curReport.readings[i].volume)*(60/curReport.readings[i].secondsElapsed);
        }
        else{
            return 0;
        }
    }
    /**
     * Create an array to use for a table row from reading data
     */
    function filterReadings(){
        let readingsArr = [];
        for(let i = 0; i < curReport.readings.length; i++){
            readingsArr[i] = {

                id: i,
                Time: curReport.readings[i].secondsElapsed,
                Volume: curReport.readings[i].volume,
                Rate: findRate(i)

            };
        }
        return {reports: readingsArr};
    }

    /**
     * map state to table elements
     */
    function renderTableData() {
        return state.reports.map((report, index) => {
            const {id, Time, Volume,Rate} = report //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{Time}</td>
                    <td>{Volume}</td>
                    <td>{Rate}</td>
                </tr>
            )
        })
    }

    /**
     * create header for table
     */
    function renderTableHeader() {
        let header = Object.keys(state.reports[0])
        return header.map((key, index) => {
            console.log(key.toUpperCase())
            if (key.toUpperCase() === "ID") {
                return <th key={index}>{key.toUpperCase()}</th>
            }
            if (key.toUpperCase() === "TIME") {
                return <th key={index}>{key.toUpperCase() + " (s)"}</th>
            }


            if (key.toUpperCase() === "VOLUME") {
                return <th key={index}>{key.toUpperCase() + " (mL)"}</th>
            }
            if (key.toUpperCase() === "RATE") {
                return <th key={index}>{key.toUpperCase() + " (mL/min)"}</th>
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


export default Table //exporting a component make it reusable and this is the beauty of react