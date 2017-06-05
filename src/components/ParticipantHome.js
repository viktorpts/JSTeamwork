import React, {Component} from 'react';

// Services
import {createImplicitUser} from '../services/auth';

// Components
import ParticipantBox from './participant/ParticipantBox';

export default class ParticipantHome extends Component {
    constructor(props) {
        super(props);

        this.state = {teams: [], auth: 0};

        // Bind event listeners
        this.onRepoChange = this.onRepoChange.bind(this);
    }

    async authenticate() {
        try {
            await createImplicitUser();
            this.setState({auth: 1});
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
            this.setState({auth: -1});
        }
    }

    componentDidMount() {
        this.authenticate();
    }

    onRepoChange(data) {
        // This method will update state, based on a change in the repository (flux style)
    }

    render() {
        let main = <p>Authenticating...</p>;
        if (this.state.auth === 1) {
            main = <ParticipantBox />;
        } else if (this.state.auth === -1) {
            main = <p style={{color: "red"}}>There was an authentication error.</p>;
        }

        return (
            <div>
                <h1>Teamwork Assistant</h1>
                {main}
            </div>
        )
    }
}