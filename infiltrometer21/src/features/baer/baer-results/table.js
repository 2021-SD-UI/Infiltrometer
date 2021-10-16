import React, {Component, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {selectCurId, selectReports} from "../../reports/reportsSlice";
import {SeverityRatings} from "../../reports/severityRatings";

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

            let deltaV = curReport.readings[i-1].volume - curReport.readings[i].volume;
            let deltaT = curReport.readings[i].secondsElapsed - curReport.readings[i-1].secondsElapsed;
            return (deltaV)/(deltaT/60);
        }
        else{
            return 0;
        }
    }

    /**
     * Find average rate (ml/min)
     * Relies on findRate(i) to get rates for calculating the average
     * @param {The current reading index} i
     */
    function findAverageRate() {
        let sum = 0;

        for(let i = 0; i < curReport.readings.length; i++) {
            sum += findRate(i);
        }

        return sum/(curReport.readings.length - 1);
    }

    /**
     * Returns severity rating based on average rate
     * See severityRatings.js for severity rating values
     * @param {Average flow rate} avgRate
     */
    function findSeverityRating(avgRate) {
        if (avgRate >= SeverityRatings.None.min)
            return <td className="text-center">None</td>
        if (avgRate >= SeverityRatings.Strong.min && avgRate < SeverityRatings.Strong.max)
            return <td className="text-center">Strong</td>
        if (avgRate >= SeverityRatings.Weak.min && avgRate < SeverityRatings.Weak.max)
            return <td className="text-center">Weak</td>
        else return <td className="text-center">N/A</td>
    }

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
                Rate: findRate(i)

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
            <div>
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
                            <td className="text-center">{findAverageRate().toPrecision(4)}</td>
                            {findSeverityRating(findAverageRate())}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
}


export default Table //exporting a component make it reusable and this is the beauty of react