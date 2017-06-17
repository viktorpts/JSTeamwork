import React, {Component} from 'react';
import {getAllUsers, archiveTeams as archive, applyTeamWipe} from '../../services/repository';
import Participant from './assign/Participant';
import Team from './assign/Team';

export default class Assign extends Component {
    constructor(props) {
        super(props);

        this.state = {status: 0, list: []};

        // Bind event listeners
        this.reload = this.reload.bind(this);
        this.archiveTeams = this.archiveTeams.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
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

    archiveTeams(event) {
        let btn = event.target;
        btn.disabled = true;
        let list = archive(this.state.list);
        this.setState({list: list, status: 2});
    }

    async saveChanges(event) {
        let btn = event.target;
        btn.disabled = true;
        this.setState({status: 3});

        try {
            await applyTeamWipe(this.state.list);
            this.setState({status: 0});
            this.loadParticipants();
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
            this.setState({status: -1});
        }
    }

    render() {
        let main = <p>Loading participants...</p>;
        if (this.state.status === -1) {
            main = <p style={{color: "red"}}>Request error, see log for details.</p>
        } else if (this.state.status === 1) {
            main =
                <div>
                    <div>
                        {this.state.list.filter(e => e.Role === 'In Class').map(row =>
                            <Participant key={row._id} user={row}/>)}
                    </div>
                    <div>
                        {this.state.list.filter(e => e.Role === 'Onsite').map(row =>
                            <Participant key={row._id} user={row}/>)}
                    </div>
                    <div>
                        {this.state.list.filter(e => e.Role === 'Online').map(row =>
                            <Participant key={row._id} user={row}/>)}
                    </div>
                    <div>
                        {this.state.list.filter(e => e.Role === 'DQ').map(row =>
                            <Participant key={row._id} user={row}/>)}
                    </div>
                </div>;
        } else if (this.state.status === 2) {
            main =
                <div>
                    <h3>Teams have been archived, presence has been wiped</h3>
                    <button onClick={this.saveChanges}>Commit changes</button>
                    <div>
                        {this.state.list.filter(e => e.Role === 'In Class').map(row =>
                            <Participant key={row._id} user={row}/>)}
                    </div>
                    <div>
                        {this.state.list.filter(e => e.Role === 'Onsite').map(row =>
                            <Participant key={row._id} user={row}/>)}
                    </div>
                    <div>
                        {this.state.list.filter(e => e.Role === 'Online').map(row =>
                            <Participant key={row._id} user={row}/>)}
                    </div>
                    <div>
                        {this.state.list.filter(e => e.Role === 'DQ').map(row =>
                            <Participant key={row._id} user={row}/>)}
                    </div>
                </div>;
        } else if (this.state.status === 3) {
            main = <p>Saving changes...</p>;
        }

        return (
            <div>
                <h2>Manage participants</h2>
                <div>
                    <button onClick={this.reload}>&#8635;</button>
                    <button onClick={this.archiveTeams}>Archive teams</button>
                </div>
                {main}
            </div>
        )
    }
}