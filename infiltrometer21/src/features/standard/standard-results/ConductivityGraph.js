import { useDispatch, useSelector } from "react-redux";
import { selectCurId, selectReports, setCurInfiltrometerData } from "../../reports/reportsSlice";
import LineChart from 'react-linechart';
import { methods } from "../../regression/regression-js";
import '../../../../node_modules/react-linechart/dist/styles.css';
import React, { useMemo } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { selectInitialVolume } from "../../reused-components/reused-slices/initializeSlice";
const ConductivityGraph = () => {

    const reports = useSelector(selectReports);
    const curReport = reports[useSelector(selectCurId)];
    const soilType = curReport.infiltrometerData.soilType;
    const initialVolume = Number(useSelector(selectInitialVolume));



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
    const h = curReport.infiltrometerData.infiltrometerSuction;
    const alpha = soilType.alpha
    const radius = curReport.infiltrometerData.infiltrometerRadius;
    const C1 = curReport.infiltrometerData.C1;
    const C2 = curReport.infiltrometerData.C2;
    const A = () => {
        if (N >= 1.9) {
            return [11.65 * (Math.pow(N, 0.1) - 1) * Math.exp(2.92 * (N - 1.9) * alpha * h)] / [Math.pow(alpha * radius, 0.91)];
        }
        // N < 1.9
        return [11.65 * (Math.pow(N, 0.1) - 1) * Math.exp(7.5 * (N - 1.9) * alpha * h)] / [Math.pow(alpha * radius, 0.91)];
    }
    const K = C1 / A();
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

        //update constants in the store
        dispatch(setCurInfiltrometerData(
            {
                ...curReport.infiltrometerData,
                C1: result.equation[1],
                C2: result.equation[0],
                K: Number(result.equation[0] / A())
            }));
        //predict is the polynomial equation
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
                {
                    C1 && C2 && K &&
                    <Row className="mt-4">
                        <Col>
                            <Table className="table table-striped table-hover">
                                <thead>
                                    <tr class="table-dark">
                                        <th>
                                            C1 (cm/s^(½))
                                        </th>
                                        <th>
                                            C2 (cm/s)
                                        </th>
                                        <th>
                                            K (cm/s^(½))
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        < td>
                                            <Container className="my-2">
                                                <Row>
                                                    <Col>
                                                        {`${C1.toFixed(4)}`}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </td>
                                        < td>
                                            <Container className="my-2">
                                                <Row>
                                                    <Col>
                                                        {`${C2.toFixed(4)}`}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </td>
                                        < td>
                                            <Container className="my-2">
                                                <Row>
                                                    <Col>
                                                        {`${K.toFixed(4)}`}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                }
            </Container>
        </>
    );
}


export default ConductivityGraph;