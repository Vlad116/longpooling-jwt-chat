import React, {Component} from 'react'
import MessageService from '../service/MessageService.js';
import AuthenticationService from "../service/AuthenticationService";
import {Col, Row} from "react-bootstrap";


let dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
};

class ChatComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            // userName: '',
            text: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.sendClicked = this.sendClicked.bind(this)
        this.refreshMessages = this.refreshMessages.bind(this)
    }

    componentDidMount() {
        this.getAllMessages();
        // this.getLoggedInUser();
        this.connect();
    }

    connect() {
        MessageService.connect().then(() => this.refreshMessages());
    }

    refreshMessages() {
        MessageService.retrieveNewMessages()
            .then(
                response => {
                    this.setState({messages: this.state.messages.concat(response.data)})
                    this.refreshMessages()
                }
            )
    }

    getAllMessages() {
        MessageService.retrieveAllMessages().then(response => {
            this.setState({messages: this.state.messages.concat(response.data)})
        })
    }

    // getLoggedInUser() {
    //     AuthenticationService.getLoggedInUser().then(response => {
    //         this.setState({userName: response.data})
    //     })
    // }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    sendClicked() {
        MessageService.send(this.state.text).then(() => this.setState({text: ''}));
    }


    render() {
        const userName = AuthenticationService.getLoggedInUserName();
        return (
            <div className="container">
                <br/>
                <Row>
                    <Col xs={8} md={12}>
                        <div className="mesgs">
                            <div className="msg_history">
                                {
                                    this.state.messages.map(
                                        message => userName === message.sender.login ?
                                            <div className="outgoing_msg" id={message.id}>
                                                <div className="sent_msg">
                                                    {userName}
                                                    <p>{message.value}</p>
                                                    <span
                                                        className="time_date">{message.time.toLocaleString("en-US", dateOptions)}</span>
                                                </div>
                                            </div> :
                                            <div className="incoming_msg" id={message.id}>
                                                <div className="incoming_msg_img"><img
                                                    src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/>
                                                </div>
                                                <div className="received_msg">
                                                    <div className="received_withd_msg">
                                                        {message.sender.login}
                                                        <p>{message.value}</p>
                                                        <span
                                                            className="time_date">{message.time.toLocaleString("en-US", dateOptions)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                }
                            </div>

                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input type="text"
                                           name="text"
                                           value={this.state.text}
                                           onChange={this.handleChange}
                                           className="write_msg"
                                           placeholder="Write a message"/>
                                    <button className="msg_send_btn" type="button" onClick={this.sendClicked}>
                                        <i className="fa fa-paper-plane-o"
                                           aria-hidden="true"/><i>Send</i></button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ChatComponent
