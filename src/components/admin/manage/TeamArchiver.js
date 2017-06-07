import React, {Component} from 'react';
import {updateUser} from '../../../services/repository';

export default class TeamArchiver extends Component {
    constructor(props) {
        super(props);

        this.state = {status: 0};
    }

    componentDidMount() {
        this.updateUser();
    }

    async updateUser() {
        try {
            await updateUser(this.props.user);
            this.setState({status: 1});
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
            this.setState({status: -1});
        }
    }

    render() {
        let element = <p style={{color: "blue"}}>Archiving {this.props.user.Username}...</p>;
        switch (this.state.status) {
            case 1:
                element = <p style={{color: "green"}}>Done.</p>;
                break;
            case -1:
                element = <p style={{color: "red"}}>Error archiving {this.props.user.Username}.</p>;
                break;
        }

        return element;
    }
}