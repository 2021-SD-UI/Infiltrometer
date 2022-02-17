import React, { useState } from "react";
import { Container, Row, Col, Collapse } from "react-bootstrap";

export function HomePage() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Container className="mt-3">

                <div class="rounded border shadow">
                    <Row >
                        <h1 className="my-4 display-4">Mini-Disk Infiltrometer Companion</h1>
                    </Row>
                    <Row>
                        <div className="m-4 display-6">About The App</div>
                        <Row>
                            <Col className="mx-4">
                                This application was developed by Software Engineering students at Michigan Technological University, and is meant to be used with the Mini-Disk Infiltrometer to aid in recording soil infiltration data. Gathered data will be stored on your local device upon completing a reading. This data can be downloaded as a CSV for later use. These CSV reports may also be viewed in Excel.
                                <hr />
                            </Col>

                        </Row>

                        <div className="m-4 display-6">How To Start a Test</div>
                        <Row>
                            <Col className="mx-4">
                                Begin a new test using the desired protocol by clicking "New Test" in the navigation bar at the top of the screen. On smaller devices, click the icon with three horizontal lines on the top right to view the navigation bar's contents. Select the protocol you wish to use, and follow the on-screen prompts to fill in the required information. For more information about how to conduct a test, see the "Manual" section of the Navbar at the top of the screen.

                                <a
                                    onClick={() => setOpen(!open)}
                                    aria-controls="gps-collapse-text"
                                    aria-expanded={open}
                                    className="text-center"
                                >
                                    <br/><br/>
                                    The app can use your device's GPS to determine your location, but you need to allow it when the protocol page loads. If you have blocked the location and later want to allow it  then you will need to change your device settings.
                                </a>
                                <Collapse in={open}>
                                    <div id="gps-collapse-text">
                                        To re-enable location services on your device if you've already disabled them:
                                        <ul>
                                            <li>
                                                iPhone:
                                                <ol type="1">
                                                    <li>Go to Settings {">"} Privacy</li>
                                                    <li>Tap Location Services</li>
                                                    <li>Move the Location Services slideter to on/green. Location Services are now on.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                Android:
                                                <ol type="1">
                                                    <li>Go to Settings {">"} Location</li>
                                                    <li>Move the slider to On. Location Services are now on.</li>
                                                </ol>
                                            </li>
                                        </ul>
                                        <a href="https://www.lifewire.com/turn-on-mobile-location-services-4156232" target="_blank">Source</a>
                                    </div>
                                </Collapse>
                                <hr />
                            </Col>

                        </Row>
                        <div className="m-4 display-6">How To View/Download a Report</div>
                        <Row>
                            <Col className="mx-4">
                                <div class="alert alert-danger" role="alert">
                                    This app stores reports temporarily in your web browser's local storage. To prevent data from being lost, please download your reports from the "My Reports" page.
                                </div>

                                All of your saved reports can be found under "My Reports" in the navigation bar. A report can be accessed by using the "View" button next to a report. A report can be deleted by using the red "Delete" button next to a report or by selecting report(s) via the checkbox and using the "Delete" button above the table of reports. Report(s) can be downloaded by selecting report(s) via the checkbox and using the "Download" button.
                                <hr />
                            </Col>
                        </Row>
                        <div className="m-4 display-6">More Information</div>
                        <Row>
                            <Col className="mx-4">
                                More information about how to use the Mini-Disk Infiltrometer can be found under "Manuals" in the navigation bar.
                                <hr />
                            </Col>
                        </Row>

                    </Row>

                </div>

            </Container>
        </>);

}