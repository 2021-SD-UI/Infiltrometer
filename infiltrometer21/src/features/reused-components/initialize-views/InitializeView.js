//The Page we are displaying for the default Initialize view
import React, { useState } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { infiltrometerTypes } from '../../../app/infiltrometerType';
import { soilTypes } from '../../../app/soilTypes';
import { Pages } from '../../page-redirection/Redirector';
import { setPage } from '../../page-redirection/redirector-slice';
import { Protocols } from '../../reports/protocols';
import { addReading, newReport } from '../../reports/reportsSlice';
import { addGeoDataToReading } from '../../useful-functions/usefulFunctions';

import { setLastVolume, setVolume } from '../reused-slices/replicationSlice';
import { selectInfiltrometerData, setInfiltrometerData, setInitialVolume } from '../reused-slices/initializeSlice';

const InitializeView = ({ protocol }) => {
    const curInfiltrometerData = useSelector(selectInfiltrometerData);
    const [validated, setValidated] = useState(true);
    const dispatch = useDispatch();

    const setRadiusPreset = (event) => {
        let radius = document.getElementById("radius");
        radius.value = event;
    }

    const setSuctionPreset = (event) => {
        let suction = document.getElementById("suction");
        suction.value = event;
    }

    const setSoilPreset = (event) => {
        let nh0 = document.getElementById("nh0");
        let alpha = document.getElementById("alpha");
        nh0.value = event.nh0;
        alpha.value = event.alpha;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        let site = document.getElementById("site").value;
        let observation = document.getElementById("observation").value;
        let volume = document.getElementById("volume").value;
        let suction = document.getElementById("suction").value;
        let timeInterval = document.getElementById("timeInterval").value;
        let radius = document.getElementById("radius").value;
        let nh0 = document.getElementById("nh0").value;
        let alpha = document.getElementById("alpha").value;

        let lat = document.getElementById("lat").value;
        if (lat === "") lat = null;
        let lon = document.getElementById("lon").value;
        if (lon === "") lon = null;

        if (form.checkValidity() === false) {
            setValidated(true);
            event.stopPropagation();
        }
        else {
            let infiltrometerData = {
                initialVolume: volume,
                coordinates: { lat: Number(lat), lon: Number(lon) },
                soilType: { nh0: nh0, alpha: alpha },
                infiltrometerRadius: radius,
                timeInterval: timeInterval,
                infiltrometerSuction: suction,
                site,
                observation
            }
            function updateData() {
                //set the infitrometer data in the store
                dispatch(setInfiltrometerData(infiltrometerData));

                //set the last volume to the initial volume for the replication view
                dispatch(setInitialVolume(volume));
                dispatch(setVolume(volume));
                dispatch(setLastVolume(volume));

                //send out the new report to the store
                dispatch(newReport({
                    date: (new Date()).toString(),
                    protocol,
                    infiltrometerData
                }));

            }
            //do we need geolocation
            if (lat == null || lon == null) {
                //try to get the geolocation data
                addGeoDataToReading({ volume, secondsElapsed: 0 }, (reading) => {
                    infiltrometerData.coordinates.lat = reading.lat;
                    infiltrometerData.coordinates.lon = reading.lon

                    updateData();

                    dispatch(addReading(reading));
                    dispatch(setPage(
                        protocol === Protocols.Baer ? Pages.BaerReplicationView : Pages.StandardReplicationView
                    ));
                });
            }
            else {
                updateData();
                dispatch(addReading({ volume, secondsElapsed: 0 }));
                dispatch(setPage(
                    protocol === Protocols.Baer ? Pages.BaerReplicationView : Pages.StandardReplicationView
                ));
            }


        }
    }



    const handleReset = () => {
        let site = document.getElementById("site"); site.value = "";
        let observation = document.getElementById("observation"); observation.value = "";
        let volume = document.getElementById("volume"); volume.value = "";
        let suction = document.getElementById("suction"); suction.value = "";
        let timeInterval = document.getElementById("timeInterval"); timeInterval.value = "";
        let radius = document.getElementById("radius"); radius.value = "";
        let nh0 = document.getElementById("nh0"); nh0.value = "";
        let alpha = document.getElementById("alpha"); alpha.value = "";
    }


    return (
        <>
            <Container className="mt-3">
                <div class="rounded border shadow">
                    <h1 className="pt-5 display-4">Initialize {protocol} Protocol </h1>
                    <Form className="p-5" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className='display-6'>Site Name</Form.Label>
                                    <Form.Control
                                        id="site"
                                        type="text"
                                        size="lg"
                                        defaultValue={curInfiltrometerData.site}
                                        placeholder="Enter site name..."
                                    />
                                    <div className="pt-2" />
                                    <Form.Label className='display-6'>Observation Name</Form.Label>
                                    <Form.Control
                                        id="observation"
                                        type="text"
                                        step="any"
                                        size="lg"
                                        defaultValue={curInfiltrometerData.observation}
                                        placeholder="Enter observation..."
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="pt-5 display-6">
                            <Col>
                                <Form.Group>
                                    <Form.Label>*Volume (mL)</Form.Label>
                                    <Form.Control
                                        required
                                        id="volume"
                                        type="number"
                                        step="any"
                                        size="lg"
                                        min="0"
                                        defaultValue={curInfiltrometerData.initialVolume}
                                        placeholder="Initial Volume (mL)"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="pt-3 display-6">*Suction (cm)</Form.Label>
                                    <DropdownButton variant="dark" title="Preset Suction Values">
                                        <Dropdown.Item onSelect={() => setSuctionPreset(-0.5)}> -0.5 </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSuctionPreset(-1)}> -1 </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSuctionPreset(-2)}> -2 </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSuctionPreset(-3)}> -3 </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSuctionPreset(-4)}> -4 </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSuctionPreset(-5)}> -5 </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSuctionPreset(-6)}> -6 </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSuctionPreset(-7)}> -7 </Dropdown.Item>
                                    </DropdownButton>
                                    <div className="pt-2" />
                                    <Form.Control
                                        required
                                        id="suction"
                                        type="number"
                                        step="any"
                                        size="lg"
                                        max="0"
                                        defaultValue={curInfiltrometerData.infiltrometerSuction}
                                        placeholder="Suction (cm)"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>*Time (seconds)</Form.Label>
                                    <Form.Control
                                        required
                                        id="timeInterval"
                                        type="number"
                                        step="any"
                                        size="lg"
                                        min="1"
                                        defaultValue={curInfiltrometerData.timeInterval}
                                        placeholder="Time (sec)"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="pt-3 display-6">Radius (cm)</Form.Label>
                                    <DropdownButton variant="dark" title="Preset Infiltrometer Types">
                                        <Dropdown.Item onSelect={() => setRadiusPreset(infiltrometerTypes.MiniDisk.radius)}>
                                            {infiltrometerTypes.MiniDisk.displayName}
                                        </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setRadiusPreset(infiltrometerTypes.MiniDiskV1.radius)}>
                                            {infiltrometerTypes.MiniDiskV1.displayName}
                                        </Dropdown.Item>
                                    </DropdownButton>
                                    <div className="pt-2" />
                                    <Form.Control
                                        id="radius"
                                        type="number"
                                        step="any"
                                        size="lg"
                                        min="0"
                                        defaultValue={null}
                                        placeholder="Radius (cm)"
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
                                    <Form.Label className="pt-3 display-6">Soil Type</Form.Label>
                                    <DropdownButton variant="dark" title="Preset Soil Types">
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.undefined)}> Unknown </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.clay)}> Clay </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.clayLoam)}> Clay Loam </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.loam)}> Loam </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.loamySand)}> Loamy Sand </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.sand)}> Sand </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.sandyClay)}> Sandy Clay </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.sandyLoam)}> Sandy Loam </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.silt)}> Silt </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.siltLoam)}> Silt Loam </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.siltyClay)}> Silty Clay </Dropdown.Item>
                                        <Dropdown.Item onSelect={() => setSoilPreset(soilTypes.siltyClayLoam)}> Silty Clay Loam </Dropdown.Item>
                                    </DropdownButton>
                                    <div className="pt-2" />
                                    <Form.Label>N/H0</Form.Label>
                                    <Form.Control
                                        id="nh0"
                                        type="number"
                                        step="any"
                                        size="lg"
                                        min="0"
                                        defaultValue={null}
                                        placeholder="N/H0"
                                    />
                                    <div className="pt-2" />
                                    <Form.Label>Alpha</Form.Label>
                                    <Form.Control
                                        id="alpha"
                                        type="number"
                                        step="any"
                                        size="lg"
                                        min="0"
                                        defaultValue={null}
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
                                    <Form.Label className="pt-3 display-6">Location</Form.Label>
                                    <div className="pt-2" />
                                    <Form.Label>Latitude</Form.Label>
                                    <Form.Control
                                        id="lat"
                                        type="number"
                                        step="any"
                                        size="lg"
                                        defaultValue={null}
                                        placeholder="Latitude"
                                    />
                                    <div className="pt-2" />
                                    <Form.Label>Longitude</Form.Label>
                                    <Form.Control
                                        id="lon"
                                        type="number"
                                        step="any"
                                        size="lg"
                                        defaultValue={null}
                                        placeholder="Longitude"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <div class="alert alert-primary" role="alert">
                                    Please allow location services to include geolocation data on your report.
                                    Geolocation data is not required.
                                </div>
                                <Button type="submit" variant="dark" size="lg" className="w-100">Start Protocol</Button>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Button variant="danger" size="sm" className="w-100" onClick={handleReset}>Clear Values</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        </>

    );
}

export default InitializeView;