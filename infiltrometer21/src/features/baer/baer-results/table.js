import React, {Component, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {selectCurId, selectReports} from "../../reports/reportsSlice";
import {SeverityRatings} from "../../reports/severityRatings";
import { findAverageRate, findSeverityRating, findRate } from '../../reports/reportsDataPackager';

const Table = () => {
    const rawReports = useSelector(selectReports);

    const curReport = rawReports[useSelector(selectCurId)];


    const [state, setState] = useState(filterReadings());



    /**
     * Create an array to use for a table row from reading data
     */
    function filterReadings(){
        

        if (curReport == undefined) return{reports: []};

        let readingsArr = [];
        for(let i = 0; i < curReport.readings.length; i++){
            readingsArr[i] = {

                id: i,
                Time: curReport.readings[i].secondsElapsed,
                Volume: curReport.readings[i].volume,
                Rate: findRate(i, curReport)

            };
        }
        return {reports: readingsArr};
    }

    /**
     * map state to table elements
     */
    function renderTableData() {
        return filterReadings().reports.map((report, index) => {
            const {id, Time, Volume,Rate} = report //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{Time}</td>
                    <td>{Volume}</td>
                    <td>{Rate.toPrecision(4)}</td>
                </tr>
            )
        })
    }

    /**
     * create header for table
     */
    function renderTableHeader() {
        try{
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
        catch (e){
            return <th key = {0}>No Readings To Display</th>;
        }
        
    }

    
     //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div className="mx-5">
                <table class="table table-light table-striped table-hover" id='students'>
                    <tbody>
                    <tr class="table-dark">{renderTableHeader()}</tr>
                    {renderTableData()}
                    </tbody>
                </table>
                <table class="table table-light table-striped table-hover">
                    <tbody>
                        <tr class="table-dark">
                            <th class="text-center">AVERAGE (mL/min)</th>
                            <th className="text-center">SEVERITY RATING</th>
                        </tr>
                        <tr class="table-striped">
                            <td className="text-center">{findAverageRate(curReport).toPrecision(4)}</td>
                            <td class="text-center">{findSeverityRating(findAverageRate(curReport)).name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
}


export default Table //exporting a component make it reusable and this is the beauty of react