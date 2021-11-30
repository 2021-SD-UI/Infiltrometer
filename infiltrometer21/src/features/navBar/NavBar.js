
import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "../page-redirection/redirector-slice";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { BaerLogo } from "./baerLogo";
import { Pages } from "../page-redirection/Redirector";
export const NavBar = () => {

    const dispatch = useDispatch();
    const initialState = {
        collapsed: false
    }

    const [state, setState] = useState(initialState);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>

                <Navbar.Brand >
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <BaerLogo width={1} height={110}>
                                </BaerLogo>
                            </div>

                        </div>
                    </div>

                </Navbar.Brand>
                <Navbar.Brand href="https://www.mtu.edu/computing/" >
                    <div class="container">
                        <div class="row">

                            <div class="col">
                                <img
                                    src="https://www.mtu.edu/mtu_resources/images/download-central/logos/husky-icon/white.png"
                                    width="56"
                                    className="d-inline-block align-top"
                                    alt="MTU logo"
                                />

                            </div>

                        </div>
                    </div>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => dispatch(setPage(Pages.Homepage))}>
                            Home
                        </Nav.Link>
                        <NavDropdown title="New Test" id="new-test-drop-down">
                            <NavDropdown.Item onClick={() => dispatch(setPage(Pages.BaerInitializeView))}>
                                BAER protocol</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={() => dispatch(setPage(Pages.ReportsView))}>
                            My Reports
                        </Nav.Link>
                        <NavDropdown title="Manuals" id="manuals-drop-down">
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => dispatch(setPage(Pages.BaerManual))}>
                                BAER
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => dispatch(setPage(Pages.InfiltrometerManual))}>
                                Infiltrometer</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="https://github.com/2021-SD-UI/Infiltrometer/">
                            GitHub
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );


}