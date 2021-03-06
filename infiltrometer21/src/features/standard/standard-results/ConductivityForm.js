import { useDispatch, useSelector } from "react-redux";
import { soilTypes } from "../../../app/soilTypes";
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { setCurInfiltrometerData } from "../../reports/reportsSlice";
import { useEffect } from "react";
import { infiltrometerTypes } from "../../../app/infiltrometerType";
import { selectInfiltrometerData } from "../../reused-components/reused-slices/initializeSlice";

const ConductivityForm = () => {


    const curInfiltrometerData = useSelector(selectInfiltrometerData);
    const dispatch = useDispatch();
    const reports = useSelector(selectReports);
    const curReport = reports[useSelector(selectCurId)];

    const handleSubmit = (event) => {
        event.preventDefault();

        // Get the current data
        let infilData = { ...curReport.infiltrometerData };
        let nh0 = document.getElementById("nh0");
        let alpha = document.getElementById("alpha");
        let radius = document.getElementById("radius");

        // Update it
        infilData.infiltrometerRadius = radius.value;
        infilData.soilType = { nh0: nh0.value, alpha: alpha.value };

        // Send to store
        dispatch(setCurInfiltrometerData(infilData));
    }

    function setSoilPreset(event) {
        let nh0 = document.getElementById("nh0");
        let alpha = document.getElementById("alpha");
        nh0.value = event.nh0;
        alpha.value = event.alpha;
    }

    function setRadiusPreset(event) {
        let radius = document.getElementById("radius");
        radius.value = event;
    }

    // Automatically update soil and radius input values
    // to match the current report data
    useEffect(() => {
        setSoilPreset(curReport.infiltrometerData.soilType);
        setRadiusPreset(curReport.infiltrometerData.infiltrometerRadius);
    }, [curReport.infiltrometerData.soilType, curReport.infiltrometerData.infiltrometerRadius])

    return (
        <>
            <Container className="p-3 rounded border shadow">
                <Form noValidate validated onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="display-6">Soil Type</Form.Label>
                                <DropdownButton variant="dark" title="Preset Soil Types">
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.sand)}> Sand </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.loamySand)}> Loamy Sand </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.sandyLoam)}> Sandy Loam </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.loam)}> Loam </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.silt)}> Silt </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.siltLoam)}> Silt Loam </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.sandyClayLoam)}> Sandy Clay Loam </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.clayLoam)}> Clay Loam </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.siltyClayLoam)}> Silty Clay Loam </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.sandyClay)}> Sandy Clay </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.siltyClay)}> Silty Clay </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.clay)}> Clay </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSoilPreset(soilTypes.undefined)}> Unknown </Dropdown.Item>
                                </DropdownButton>
                                <div className="pt-2" />
                                <Form.Label>N/H0</Form.Label>
                                <Form.Control
                                    required
                                    id="nh0"
                                    type="number"
                                    step="any"
                                    size="lg"
                                    min="0"
                                    defaultValue={curInfiltrometerData.soilType.nh0}
                                    placeholder="N/H0"
                                />
                                <div className="pt-2" />
                                <Form.Label>Alpha</Form.Label>
                                <Form.Control
                                    required
                                    id="alpha"
                                    type="number"
                                    step="any"
                                    size="lg"
                                    min="0"
                                    defaultValue={curInfiltrometerData.soilType.alpha}
                                    placeholder="Alpha"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="pt-3 display-6">Radius (cm)</Form.Label>
                                <DropdownButton variant="dark" title="Preset Infiltrometer Types">
                                    <Dropdown.Item onClick={() => setRadiusPreset(infiltrometerTypes.MiniDisk.radius)}>
                                        {infiltrometerTypes.MiniDisk.displayName}
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setRadiusPreset(infiltrometerTypes.MiniDiskV1.radius)}>
                                        {infiltrometerTypes.MiniDiskV1.displayName}
                                    </Dropdown.Item>
                                </DropdownButton>
                                <div className="pt-2" />
                                <Form.Control
                                    required
                                    id="radius"
                                    type="number"
                                    step="any"
                                    size="lg"
                                    min="0"
                                    defaultValue={curInfiltrometerData.infiltrometerRadius}
                                    placeholder="Radius (cm)"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <Button type="submit" variant="dark" size="lg" className="w-100">Graph and Calculate Conductivity</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
}


export default ConductivityForm;