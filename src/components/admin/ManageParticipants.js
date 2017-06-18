import React, {Component} from 'react';
import {getAllUsers} from '../../services/repository';
import ParticipantList from './common/ParticipantList';

// TODO this functionality can be performed by the Archive component

export default class ManageParticipants extends Component {
    constructor(props) {
        super(props);

        this.state = {status: 0, list: []};

        // Bind event listeners
        this.reload = this.reload.bind(this);
    }


    componentDidMount() {
        this.loadParticipants();
    }

    async loadParticipants() {
        try {
            let list = await getAllUsers();
            this.setState({status: 1, list: list});
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
            this.setState({status: -1});
        }
    }

    async reload(event) {
        let btn = event.target;
        btn.disabled = true;
        await this.loadParticipants();
        btn.disabled = false;
    }

    render() {
        let main = <p>Loading participants...</p>;
        if (this.state.status === -1) {
            main = <p style={{color: "red"}}>Request error, see log for details.</p>
        } else if (this.state.status === 1) {
            main =
                <div>
                    <ParticipantList list={this.state.list} manage={true}/>
                </div>;
        }

        return (
            <div>
                <h2>Manage Participants</h2>
                <div>
                    <button onClick={this.reload}>&#8635;</button>
                </div>
                {main}
            </div>
        );
    }
}