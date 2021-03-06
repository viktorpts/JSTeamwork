import React, {Component} from 'react';
import {getAllUsers, createGroups as create, applyTeams, teamsExist, saveTeams} from '../../services/repository';
import ParticipantList from './common/ParticipantList';
import TeamCreator from './assign/TeamCreator';
import TeamList from './common/TeamList';

export default class Assign extends Component {
    constructor(props) {
        super(props);

        this.state = {status: 0, list: [], teams: []};

        // Bind event listeners
        this.reload = this.reload.bind(this);
        this.createGroups = this.createGroups.bind(this);
        this.saveGroups = this.saveGroups.bind(this);
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

    async createGroups(event) {
        let teams = create(this.state.list);
        this.setState({status: 2, teams: teams});
    }

    async saveGroups(event) {
        let btn = event.target;
        btn.disabled = true;
        // Apply teammates to users in local list
        let list = applyTeams(this.state.teams);
        this.setState({list: list, status: 3});

        try {
            await saveTeams(this.state.list);
            this.setState({status: 0});
            await this.loadParticipants();
            btn.disabled = false;
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
                    {teamsExist(this.state.list) && <p style={{color: "red"}}>Some participants already have teams assigned. Go to Manage to archive existing teams.</p>}
                    <ParticipantList list={this.state.list}/>
                </div>;
        } else if (this.state.status === 2) {
            main =
                <div>
                    <h2>Preliminary teams</h2>
                    <TeamList teams={this.state.teams}/>
                    <button className="btn" onClick={this.saveGroups}>Commit</button>
                </div>
        } else if (this.state.status === 3) {
            main = <p>Saving changes...</p>;
        }

        return (
            <div className="Component-body">
                <div>
                    <button className="btn" onClick={this.reload}>&#8635;</button>
                    <button className="btn" onClick={this.createGroups}>Create groups</button>
                </div>
                {main}
            </div>
        )
    }
}