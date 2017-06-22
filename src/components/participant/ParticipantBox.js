import React, {Component} from 'react';
import SignInForm from './SignInForm';
import ParticipantInfo from './ParticipantInfo';
import DQInfo from './DQInfo';
import {post} from '../../services/requester';

export default class ParticipantBox extends Component {
    constructor(props) {
        super(props);

        this.state = {userData: {currentUser: '', role: '', teammates: []}, participant: '', status: 0};

        // Bind event handlers
        this.onSignInHandler = this.onSignInHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeUserClickHandler = this.onChangeUserClickHandler.bind(this);
        this.onPresentHandler = this.onPresentHandler.bind(this);
    }

    async onPresentHandler(event) {
        let username = sessionStorage.getItem('participantName');
        this.setState({status: 1});
        try {
            let response = await post('rpc', 'custom/present', {username: username}, 'kinvey');
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
        }
        await this.loadUserInfo(username);
    }

    onSignInHandler(event) {
        event.preventDefault();
        this.loadUserInfo(this.state.participant);
    }

    onChangeHandler(event) {
        this.setState({participant: event.target.value});
    }

    onChangeUserClickHandler(event) {
        sessionStorage.removeItem('participantName');
        this.setState({userDate: {currentUser: '', role: '', teammates: []}, status: 0});
    }

    componentDidMount() {
        let current = sessionStorage.getItem('participantName');
        if (current) {
            this.loadUserInfo(current);
        }
    }

    async loadUserInfo(name) {
        this.setState({status: 1});
        try {
            let participantData = await post('rpc', 'custom/teammates', {username: name}, 'kinvey');
            if (participantData) {
                let fullName = participantData.name;
                let username = participantData.username;
                let role = participantData.role;
                let teammates = participantData.teamContacts;
                sessionStorage.setItem('participantName', username);
                this.setState({userData: {currentUser: fullName, role: role, teammates: teammates}, status: 2});
            } else {
                throw new Error('User name not found in database.');
            }
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
            this.setState({status: -1});
        }
    }

    render() {
        let info = null;
        switch (this.state.status) {
            case -1:
            case 0:
                info = <SignInForm participant={this.state.participant}
                                   onSignIn={this.onSignInHandler}
                                   onChange={this.onChangeHandler}
                                   hint={this.state.status}/>;
                break;
            case 1:
                info = <p>Loading data...</p>;
                break;
            case 2:
                if (this.state.userData.role === 'DQ') {
                    info = <DQInfo data={this.state.userData}
                                   userChange={this.onChangeUserClickHandler}/>;
                } else {
                    info = <ParticipantInfo data={this.state.userData}
                                            userChange={this.onChangeUserClickHandler}
                                            present={this.onPresentHandler}/>;
                }
                break;
        }

        return (
            <div className="participant-box Component-body">
                {info}
            </div>
        )
    }
}