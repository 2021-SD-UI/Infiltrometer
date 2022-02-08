import { useSelector } from "react-redux";
import { soilTypes } from "../../../app/soilTypes";
import { Protocols } from "../../reports/protocols";
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import { selectInitialVolume, selectInfiltrometerRadius } from '../../baer/baer-initialize/bear-initializeSlice';
import LineChart from 'react-linechart';
import { methods } from "../../regression/regression-js";
import '../../../../node_modules/react-linechart/dist/styles.css';
import React, { Component, useEffect } from "react";
import { Container } from "react-bootstrap";

const ConductivityGraph = () => {

    const reports = useSelector(selectReports);
    const curReport = reports[useSelector(selectCurId)];
    const initialVolume = Number(useSelector(selectInitialVolume));
    const radius = curReport.infiltrometerData.infiltrometerRadius;

    // Will give you the format:
    // [{x,y}, {x,y}, ... ]
    // to be used in regression
    function readingsArray() {
        let points = [];

        curReport.readings.forEach(r => {
            let point = { x: Math.sqrt(Number(r.secondsElapsed)), y: ((initialVolume - Number(r.volume)) / (Math.PI * Math.pow(radius, 2))) };
            points.push(point);
        });
        return points;
    }

    const data = [
        {
            color: "steelblue",
            points: readingsArray()
        }
    ];

    // The graph must be given data, even if its empty.
    const noData = [
        {
            color: "steelblue",
            points: [ {x: 0, y: 0} ]
        }
    ];

    // Calculations require radius, so if radius is
    // null then don't render the graph.
    const Graph = () => {
        if (!radius) {
            return (
                <LineChart
                    width={380}
                    height={400}
                    xLabel="No data to show"
                    yLabel=""
                    data={noData}
                />
            );
        }
        else {
            return (
                <LineChart
                    width={380}
                    height={400}
                    xLabel="Square Root of Time (s)"
                    yLabel="Conductivity (cm)"
                    data={data}
                />
            );
        }
    }

    return (
        <>
            <Container className="text-center my-4">
                <Graph/>
            </Container>
        </>
    );
}


export default ConductivityGraph;