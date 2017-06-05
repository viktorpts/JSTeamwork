import React, {Component} from 'react';
import {get, post, update} from './services/requester';
import {createUser} from './services/repository';

export default class Endpoint extends Component {
    constructor(props) {
        super(props);

        this.onTest = this.onTest.bind(this);
        this.onCreate = this.onCreate.bind(this);
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

    async onCreate() {
        try {
            let response = await createUser('Mario Lastname', 'Mario', 'mario@email.com', 'Onsite');
            console.dir(response);
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
        }
    }

    render() {
        return (
            <div style={{border: "1px solid red", display: "inline-block", padding: "1em", margin: "1em"}}>
                <p>Test zone</p>
                <div>
                    <p>Retrieve full participant details</p>
                    <button onClick={this.onTest}>Test endpoint</button>
                </div>
                <div>
                    <p>Create new participant Mario</p>
                    <button onClick={this.onCreate}>Create user</button>
                </div>
            </div>
        )
    }
}