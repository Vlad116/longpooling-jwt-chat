import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';
import {Form} from "react-bootstrap";

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .executeJwtLogin(this.state.login, this.state.password)
            .then((response) => {
                console.log(response.data);
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.login, response.data)
                this.props.history.push(`/chat`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        return (
            <div>
                <br/>
                <h2>Login form</h2>
                <div className="container">
                    {this.state.hasLoginFailed &&
                    <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage &&
                    <div style={{backgroundColor: "green"}}>Login Sucessful</div>}

                    <Form>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User name:</Form.Label>
                            <Form.Control type="text"
                                          name="login"
                                          placeholder="Enter username"
                                          value={this.state.login}
                                          onChange={this.handleChange}/>
                            <Form.Text className="text-muted">
                                We'll never share your account with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          name="password"
                                          value={this.state.password}
                                          onChange={this.handleChange} />
                        </Form.Group>
                    </Form>

                    <button className="btn btn-success" onClick={this.loginClicked}>
                        Login
                    </button>
                </div>
            </div>
        )
    }
}

export default LoginComponent