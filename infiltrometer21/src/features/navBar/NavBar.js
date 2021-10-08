
import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "../page-redirection/redirector-slice";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useState } from "react";
export const NavBar = () => {

    const dispatch = useDispatch();
    const initialState = {
        collapsed: false
    }

    const [state, setState] = useState(initialState);
    return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>

            <Navbar.Brand>
                 <img
                    src="https://github.com/2021-SD-UI/Infiltrometer/blob/dev/infiltrometer21/src/features/navBar/MTU_Logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="MTU logo"
                    />
                    Infiltrometer Companion
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick = {()=>dispatch(setPage("/Infiltrometer"))}>
                        About Us
                    </Nav.Link>
                    <NavDropdown title="New Test" id="new-test-drop-down">
                        <NavDropdown.Item onClick ={()=>dispatch(setPage("/Infiltrometer/baer-initialize/"))}>
                            BAER protocol</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link onClick={()=>dispatch(setPage("/Infiltrometer/reports/"))}>
                        My Reports
                    </Nav.Link>
                     <NavDropdown title="Manuals" id="manuals-drop-down">
                         <NavDropdown.Divider />
                        <NavDropdown.Item onClick ={()=>dispatch(setPage("/Infiltrometer/manuals-baer/"))}>
                            BAER
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick ={()=>dispatch(setPage("/Infiltrometer/manuals-infiltrometer/"))}>
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