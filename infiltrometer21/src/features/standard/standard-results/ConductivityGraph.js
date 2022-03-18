import { useDispatch, useSelector } from "react-redux";
import { selectCurId, selectReports, setCurInfiltrometerData } from "../../reports/reportsSlice";
import LineChart from 'react-linechart';
import { methods } from "../../regression/regression-js";
import '../../../../node_modules/react-linechart/dist/styles.css';
import React, { useMemo } from "react";
import { Container } from "react-bootstrap";
import { selectInitialVolume } from "../../reused-components/reused-slices/initializeSlice";
const ConductivityGraph = () => {

    const reports = useSelector(selectReports);
    const curReport = reports[useSelector(selectCurId)];
    const soilType = curReport.infiltrometerData.soilType;
    const initialVolume = Number(useSelector(selectInitialVolume));
    const radius = curReport.infiltrometerData.infiltrometerRadius;


    //For Conductivity Calcuations ///////////////////////////
    //THIS IS WHAT IFILTROMETER DATA LOOKS LIKE:
    /*
    infiltrometerData = {
        initialVolume: volume,
        coordinates: { lat: Number(lat), lon: Number(lon) },
        soilType: { nh0: nh0, alpha: alpha },
        infiltrometerRadius: radius,
        timeInterval: timeInterval,
        infiltrometerSuction: suction,
        site,
        observation,
        C1,
        C2,
        K
    }*/
    const dispatch = useDispatch();
    const N = soilType.nh0;
    const alpha = soilType.alpha
    const C1 = curReport.infiltrometerData.C1;
    const C2 = curReport.infiltrometerData.C2;
    const A = () => {
        //TODO: Calculate A, this relies on soil data (n) and other stuff
        //see the specified pages in the Sprint 11 acceptance criteria



        return 1;
    }
    const K = () => C2 / A;
    ////////////////////////////////////////////////////////////



    // Will give you the format:
    // [{x,y}, {x,y}, ... ]
    // to be used in regression
    function readingsArray() {

        if (curReport.readings.length <= 1) { return []; }

        let points = [];
        //sort the readings by time

        curReport.readings.forEach(r => {
            let point = { x: Math.sqrt(Number(r.secondsElapsed)), y: ((initialVolume - Number(r.volume)) / (Math.PI * Math.pow(radius, 2))) };
            points.push(point);
        });
        return points;
    }

    function interpolatedPoints(end, steps) {
        //get the equation
        let points = [];
        curReport.readings.forEach(r => {
            let point = [Math.sqrt(Number(r.secondsElapsed)), ((initialVolume - Number(r.volume)) / (Math.PI * Math.pow(radius, 2)))];
            points.push(point);
        });

        let result = methods.polynomial(points, { order: 2, precision: 15 });
        //predict is the polynomial equation
        dispatch(setCurInfiltrometerData(
            {
                ...curReport.infiltrometerData,
                C1: result.equation[1],
                C2: result.equation[0],
                K: Number(C2 / A())
            }));

        const predict = (x) => (result.equation[0] * x * x) + (result.equation[1] * x);

        let intPoints = [];
        for (let i = 0; i <= end; i += (end / steps)) {
            intPoints.push({ x: i, y: predict(i) });
        }
        return intPoints;
    }



    const data = useMemo(() =>

        [
            {
                id: "1",
                name: "Interpolated",
                color: "red",
                points: readingsArray().length >= 1 ? interpolatedPoints(readingsArray()[readingsArray().length - 1].x, 100) : null
            },
            {

                id: "0",
                name: "Actual Data",
                color: "Blue",
                points: readingsArray(),
                interpolate: "none"
            }

        ]
        , [radius, soilType]);


    // The graph must be given data, even if its empty.
    const noData = [
        {
            color: "steelblue",
            points: [{ x: 0, y: 0 }],
            interpolate: "none"
        }
    ];

    // Calculations require radius, so if radius is
    // null then don't render the graph.
    const Graph = () => {
        if (!radius || curReport.readings.length <= 1) {
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
                    showLegends="true"
                    width={380}
                    height={400}
                    xLabel="Square Root of Time (s)"
                    yLabel="Infiltration (cm)"
                    data={data}
                    hideLines={false}
                    hidePoints={false}
                />
            );
        }
    }

    return (
        <>
            <Container className="text-center my-4">
                <Graph />
            </Container>
        </>
    );
}


export default ConductivityGraph;