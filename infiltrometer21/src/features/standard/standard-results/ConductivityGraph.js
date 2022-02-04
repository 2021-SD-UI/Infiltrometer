import { useSelector } from "react-redux";
import { soilTypes } from "../../../app/soilTypes";
import { Protocols } from "../../reports/protocols";
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import LineChart from 'react-linechart';
import { methods } from "../../regression/regression-js";
import '../../../../node_modules/react-linechart/dist/styles.css';
import React, { Component, useEffect } from "react";
import { Container } from "react-bootstrap";

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


    // Will give you the format:
    // [{x,y}, {x,y}, ... ]
    // to be used in regression
    function readingsArray() {
        let points = [];
        curReport.readings.forEach(r => {
            let point = { x: Number(r.secondsElapsed), y: Number(r.volume) };
            points.push(point);
            //methods.polynomial(points, {order: 2, precision: 15});
        });
        // [{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 7, y: -3 }]
        return points;
    }

    const data = [
        {
            color: "steelblue",
            points: readingsArray()
        }
    ];

    return (
        <>
            <Container className="text-center">
                <LineChart
                    width={380}
                    height={400}
                    xLabel="Time (s)"
                    yLabel="Conductivity"
                    data={data}
                />
            </Container>
            {validValues ? "The values are valid" : "The values are not valid!"}
        </>
    );
}


export default ConductivityGraph;