import React from "react";
import { Container, Row, Col } from "react-bootstrap";
export function HomePage() {
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
                            <Col>
                                About The App
                            </Col>
                        </Row>

                        <div className="m-4 display-6">How To Start a Test</div>
                        <Row>
                            <Col>
                                How To Use
                            </Col>
                        </Row>
                        <div className="m-4 display-6">How To View/Download Report</div>
                        <Row>
                            <Col>
                                About The App
                            </Col>
                        </Row>
                        <div className="m-4 display-6">More Information</div>
                        <Row>
                            <Col>
                                About The App
                            </Col>
                        </Row>

                    </Row>

                </div>

            </Container>
        </>);

}