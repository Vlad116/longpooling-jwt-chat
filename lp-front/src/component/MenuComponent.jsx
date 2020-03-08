import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';
import {Nav, Navbar} from "react-bootstrap";

class MenuComponent extends Component {

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <Navbar bg="info" variant="dark">
                <Navbar.Brand>
                    <Nav>
                        <Link className="nav-link" to="/chat">
                            <b><i>Chat</i></b>
                        </Link>
                    </Nav>
                </Navbar.Brand>

                <Nav className="mr-auto">

                    <Nav>
                        <Link className="nav-link" to="/chat">
                            Home Page
                        </Link>
                    </Nav>

                </Nav>

                <Nav>
                    {!isUserLoggedIn &&
                    <Link className="nav-link" to="/login">Login</Link>}
                    {!isUserLoggedIn &&
                    <Link className="nav-link" to="/register">Register</Link>}
                    {isUserLoggedIn &&
                    <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link>}
                </Nav>

            </Navbar>
        )
    }
}

export default withRouter(MenuComponent)