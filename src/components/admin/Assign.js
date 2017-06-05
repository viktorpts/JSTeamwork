import React, {Component} from 'react';
import {getAllUsers, createGroups as create, applyTeams} from '../../services/repository';
import Participant from './assign/Participant';
import Team from './assign/Team';
import TeamCreator from './assign/TeamCreator';

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

    saveGroups(event) {
        let btn = event.target;
        btn.disabled = true;
        // Apply teammates to users in local list
        let list = applyTeams(this.state.teams);
        this.setState({list: list, status: 3});
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
                    <h2>Preliminary teams</h2>
                    {this.state.teams.map(team =>
                        <Team key={team.map(e => e.Username).join('')}
                              list={team}/>)}
                    <button onClick={this.saveGroups}>Commit</button>
                </div>
        } else if (this.state.status === 3) {
            main =
                <div>
                    <p style={{color: "red"}}>Do not close this window until all tasks are finished!</p>
                    {this.state.list.map(user =>
                        <TeamCreator key={user.Username}
                                     user={user}/>)}
                </div>;
        }

        return (
            <div>
                <h2>Assign teams</h2>
                <div>
                    <button onClick={this.reload}>&#8635;</button>
                    <button onClick={this.createGroups}>Create groups</button>
                </div>
                {main}
            </div>
        )
    }
}