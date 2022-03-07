
import { useDispatch } from "react-redux";
import { setPage } from "../page-redirection/redirector-slice";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { BaerLogo } from "./baerLogo";
import { Pages } from "../page-redirection/Redirector";
export const NavBar = () => {

    const dispatch = useDispatch();
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>

                <Navbar.Brand >
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <BaerLogo width={1} height={110}>
                                </BaerLogo>
                            </div>
                        </div>
                    </div>

                </Navbar.Brand>
                <Navbar.Brand href="https://www.mtu.edu/computing/" >
                    <div className="container">
                        <div className="row">
                            <div className="col">
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
                                BAER Protocol</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => dispatch(setPage(Pages.StandardInitializeView))}>
                                Standard Protocol</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={() => dispatch(setPage(Pages.ReportsView))}>
                            My Reports
                        </Nav.Link>
                        <NavDropdown title="Manuals" id="manuals-drop-down">
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => dispatch(setPage(Pages.BaerManual))}>
                                USDA Field Guide
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => dispatch(setPage(Pages.NewBaerManual))}>
                                BAER Article
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => dispatch(setPage(Pages.InfiltrometerManual))}>
                                MiniDisk Manual
                            </NavDropdown.Item>
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