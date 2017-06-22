import React, {Component} from 'react';
import {getAllUsers, archiveTeams as archive, applyTeamWipe, teamsExist, teamsFromUsers} from '../../services/repository';
import ParticipantList from './common/ParticipantList';
import TeamList from './common/TeamList';

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
                    {!teamsExist(this.state.list) && <p style={{color: "red"}}>No teams have been detected. You can still wipe presence information (this will delete team history!).</p>}
                    <TeamList teams={teamsFromUsers(this.state.list)} />
                </div>;
        } else if (this.state.status === 2) {
            main =
                <div>
                    <h3>Teams have been archived, presence has been wiped</h3>
                    <button onClick={this.saveChanges}>Commit changes</button>
                    <ParticipantList list={this.state.list} />
                </div>;
        } else if (this.state.status === 3) {
            main = <p>Saving changes...</p>;
        }

        return (
            <div className="Component-body">
                <div>
                    <button className="btn" onClick={this.reload}>&#8635;</button>
                    <button className="btn" onClick={this.archiveTeams}>Archive teams</button>
                </div>
                {main}
            </div>
        )
    }
}