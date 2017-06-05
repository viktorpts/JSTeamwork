import React, {Component} from 'react';
import {login} from '../services/auth';

import Endpoint from '../Endpoint';
import AdminLoginForm from './admin/AdminLoginForm';
import AdminPanel from './admin/AdminPanel';

export default class AdminHome extends Component {
    constructor(props) {
        super(props);

        this.state = {status: 0, formUsername: '', formPassword: ''};

        // Bind event handlers
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    async onFormSubmit(event) {
        event.preventDefault();
        this.setState({status: 1});
        try {
            await login(this.state.formUsername, this.state.formPassword);
            this.setState({status: 2});
        }
        catch (err) {
            console.error('Request failed');
            console.dir(err);
            this.setState({status: -1});
        }
    }

    onInputChange(event) {
        switch (event.target.name) {
            case "username":
                this.setState({formUsername: event.target.value});
                break;
            case "password":
                this.setState({formPassword: event.target.value});
                break;
        }
    }

    render() {
        let main = null;
        switch (this.state.status) {
            case 0:
                main = <AdminLoginForm onFormSubmit={this.onFormSubmit}
                                       onInputChange={this.onInputChange}
                                       username={this.state.formUsername}
                                       password={this.state.formPassword}/>;
                break;
            case 1:
                main = <p>Loading...</p>;
                break;
            case 2:
                main = <AdminPanel />;
                break;
            case -1:
                main = <p>Error encountered, see logs for details.</p>;
                break;
        }

        return (
            <div>
                <p>Admin Panel</p>
                {main}
                <Endpoint/>
            </div>
        )
    }
}