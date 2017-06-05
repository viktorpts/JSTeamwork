import React, {Component} from 'react';
import {get, post, update} from './services/requester';

export default class Endpoint extends Component {
    constructor(props) {
        super(props);

        this.onTest = this.onTest.bind(this);
    }

    async onTest() {
        try {
            let response = await post('rpc', 'custom/present', {username: sessionStorage.getItem('participantName')}, 'kinvey');
            console.dir(response);
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
        }
    }

    render() {
        return (
            <div>
                <p>Endpoint test results</p>
                <button onClick={this.onTest}>Test endpoint</button>
            </div>
        )
    }
}