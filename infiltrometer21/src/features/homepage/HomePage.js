import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

export function HomePage() {
    return (
        <>
            <Container className="mt-4 p-4 rounded border shadow">
                <h1 className="display-4 mb-4">Mini-Disk Infiltrometer Companion</h1>
                <Row className="p-2">
                    <h3 className="display-6">About The App</h3>
                    <Col>
                        This application was developed by software engineering students at 
                        Michigan Technological University, and is meant to be used with the 
                        Mini-Disk Infiltrometer to aid in recording soil infiltration data. 
                        Gathered data will be stored on your local device upon completing a reading. 
                        This data can be downloaded as a CSV for later use. 
                        These CSV reports may also be viewed in Excel.
                    </Col>
                </Row>
                <hr />
                <Row className="p-2">
                    <h3 className="display-6">How To Start a Test</h3>
                    <Col>
                        Begin a new test using the desired protocol by clicking "New Test" in 
                        the navigation bar at the top of the screen. On smaller devices, click 
                        the icon with three horizontal lines on the top right to view the navigation 
                        bar's contents. Select the protocol you wish to use, and follow the on-screen 
                        prompts to fill in the required information. For more information about how to 
                        conduct a test, see the "Manual" section of the navigation bar at the top of the screen.
                        <br /><br />
                        The app can use your device's GPS to determine your location, but you need 
                        to allow it to do so when the protocol page loads.
                    </Col>
                </Row>
                <hr />
                <Row className="p-2">
                    <h3 className="display-6">How To View/Download a Report</h3>
                    <Col>
                        <Alert variant="danger" className="text-center">
                            This app stores reports temporarily in your web browser's local storage. 
                            To prevent data from being lost, please download your reports from the "My Reports" page.
                        </Alert>
                        All of your saved reports can be found under "My Reports" in the navigation bar. 
                        A report can be accessed by using the "View" button next to a report. A report can 
                        be deleted by using the red "Delete" button next to a report or by selecting report(s) 
                        via the checkbox and using the "Delete" button above the table of reports. Report(s) 
                        can be downloaded by selecting report(s) via the checkbox and using the "Download" button.
                    </Col>
                </Row>
                <hr />
                <Row className="p-2">
                    <h3 className="display-6">More Information</h3>
                    <Col>
                        More information about how to use the Mini-Disk Infiltrometer can be found 
                        under "Manuals" in the navigation bar.
                    </Col>
                </Row>
            </Container>
        </>);

}