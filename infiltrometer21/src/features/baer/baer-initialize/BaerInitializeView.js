//The Page we are displaying for the baer Initialize view
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReading, newReport, selectCurId, selectReports } from '../../reports/reportsSlice';
import { Protocols } from '../../reports/protocols'
import {
  selectInitialVolume, selectInfiltrometerData,
  selectInfiltrometerRadius, selectInfiltrometerSuction,
  setInitialVolume, setInfiltrometerSuction, setTimeInterval,
  selectTimeInterval, setSoilType, selectSoilType, setInfiltrometerData
} from './bear-initializeSlice';
import { setLastVolume, setSecondsElapsed, setVolume } from '../baer-replication/bear-replicationSlice';
import { soilTypes } from '../../../app/soilTypes';
import { setPage } from '../../page-redirection/redirector-slice';
import { Button, Form, Dropdown, DropdownButton, Container, Row, Col } from 'react-bootstrap';
import { infiltrometerTypes } from '../../../app/infiltrometerType';
import { addGeoDataToReading, addReadingWithGeoData } from '../../useful-functions/usefulFunctions';

const BaerInitializeView = () => {
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

    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
    }
    else {
      let infiltrometerData = {
        initialVolume: volume,
        coordinates: { lat: 0, long: 0, },
        soilType: { nh0: nh0, alpha: alpha },
        infiltrometerRadius: radius,
        timeInterval: timeInterval,
        infiltrometerSuction: suction,
        site,
        observation
      }

      //set the infitrometer data in the store
      dispatch(setInfiltrometerData(infiltrometerData));

      //set the last volume to the initial volume for the replication view
      dispatch(setInitialVolume(volume));
      dispatch(setVolume(volume));
      dispatch(setLastVolume(volume));

      //send out the new report to the store
      dispatch(newReport({
        date: (new Date()).toString(),
        protocol: Protocols.Baer,
        infiltrometerData
      }));



      //try to get the geolocation data
      addGeoDataToReading({ volume, secondsElapsed: 0 }, (reading) => {
        dispatch(addReading(reading));
        dispatch(setPage("/Infiltrometer/baer-replication"));
      });

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
          <h1 className="pt-5 display-4">Initialize BAER Protocol</h1>
          <Form className="p-5" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control
                    id="site"
                    type="text"
                    size="lg"
                    defaultValue={curInfiltrometerData.site}
                    placeholder="Enter site name..."
                  />
                  <div className="pt-2" />
                  <Form.Label>Observation Name</Form.Label>
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
            <Row className="pt-5">
              <Col>
                <Form.Group>
                  <Form.Label>Volume (mL)</Form.Label>
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
                  <Form.Label className="pt-3">Suction (cm)</Form.Label>
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
                  <Form.Label>Time (seconds)</Form.Label>
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
                  <Form.Label className="pt-3">Radius (cm)</Form.Label>
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
                    required
                    id="radius"
                    type="number"
                    step="any"
                    size="lg"
                    min="0"
                    defaultValue={infiltrometerTypes.MiniDisk.radius}
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
                  <Form.Label className="pt-3">Soil Type</Form.Label>
                  <DropdownButton variant="dark" title="Preset Soil Types">
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
                    required
                    id="nh0"
                    type="number"
                    step="any"
                    size="lg"
                    min="0"
                    defaultValue={soilTypes.loamySand.nh0}
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
                    defaultValue={soilTypes.loamySand.alpha}
                    placeholder="Alpha"
                  />
                  <Form.Control.Feedback type="invalid">
                    Required!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
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

export default BaerInitializeView;