import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';
import {Form} from "react-bootstrap";

class RegisterComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            login: '',
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.registerClicked = this.registerClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    registerClicked() {
        AuthenticationService
            .executeJwtRegister(this.state.login, this.state.email, this.state.password)
            .then((response) => {
                console.log(response.data);
                //AuthenticationService.registerSuccessfulLoginForJwt(this.state.login, response.data.value)
                this.props.history.push(`/login`)
            }).catch(() => {}
        )

    }

    render() {
        return (
            <div>
                <br/>
                <h2>Registration form</h2>
                <div className="container">

                    <Form>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>User name:</Form.Label>
                            <Form.Control type="text"
                                          name="login"
                                          placeholder="Enter username"
                                          value={this.state.login}
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User name:</Form.Label>
                            <Form.Control type="text"
                                          name="email"
                                          placeholder="Enter you email"
                                          value={this.state.email}
                                          onChange={this.handleChange}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          name="password"
                                          value={this.state.password}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                    </Form>

                    <button className="btn btn-success" onClick={this.registerClicked}>
                        Login
                    </button>
                </div>
            </div>
        )
    }
}

export default RegisterComponent