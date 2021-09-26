import React, {Component, useState} from 'react'
import {useSelector} from "react-redux";
import {selectReports} from "../reports/reportsSlice";

const Table =()=> {
    const rawReports = useSelector(selectReports);


    const report = filterReadings();
    console.log(report);
    const initialState = { //state is by default an object
        reports: [
            {id: 1, Time: 2, Volume: 21},
            {id: 2, Time: 5, Volume: 19},
            {id: 3, Time: 6, Volume: 16},
            {id: 4, Time: 2, Volume: 25}
        ]

    }
    function filterReadings(){
        const readingsArr = [];
        for(let i = 0; i< rawReports[0].length; i++){
            const readingObj = {

                id: 0,
                time: 0,
                Volume: 0

            };
            console.log(readingObj.time)
            console.log(readingObj);
            readingObj.id = rawReports[0].readings[i].id;
            readingObj.time = rawReports[0].readings[i].secondsElapsed;
            readingObj.Volume = rawReports[0].readings[i].volume;
            readingsArr[i] = readingObj;
            console.log(readingsArr);
        }
        return readingsArr;
    }
    const [state, setState] = useState(initialState);
    state.reports=filterReadings();

    function renderTableData() {

        return state.reports.map((report, index) => {
            const {id, Time, Volume} = report //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{Time}</td>
                    <td>{Volume}</td>

                </tr>
            )
        })
    }

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
            /*if (key.toUpperCase() === "INFILT") {
                return <th key={index}>{key.toUpperCase() + " (cm)"}</th>
            }*/
            // return <th key={index}>{key.toUpperCase()}</th>
        })
    }



     //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div>
                <h1 id='title' align={"center"}>Mini-disk data</h1>
                <table id='students'>
                    <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderTableData()}
                    </tbody>
                </table>
            </div>
        )
}


export default Table //exporting a component make it reusable and this is the beauty of react