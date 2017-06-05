import React, {Component} from 'react';
import {createUser} from '../../../services/repository';

export default class ParticipantCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {status: 0};
    }

    componentDidMount() {
        this.createUser();
    }

    async createUser() {
        try {
            await createUser(this.props.name, this.props.username, this.props.contact, this.props.role);
            this.setState({status: 1});
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
            this.setState({status: -1});
        }
    }

    render() {
        let element = <p style={{color: "blue"}}>Importing {this.props.username}...</p>;
        switch (this.state.status) {
            case 1:
                element = <p style={{color: "green"}}>Done.</p>;
                break;
            case -1:
                element = <p style={{color: "red"}}>Error importing {this.props.username}.</p>;
                break;
        }

        return element;
    }
}