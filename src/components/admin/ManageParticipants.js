import React, { Component } from 'react';
import { getAllUsers } from '../../services/repository';
import ParticipantList from './common/ParticipantList';

//import userlist from './userlist.json';
//import { post } from '../../services/requester';

// TODO this functionality can be performed by the TeamEditor component

export default class ManageParticipants extends Component {
    constructor(props) {
        super(props);

        this.state = { status: 0, list: [], lastId: 0 };

        // Bind event listeners
        this.reload = this.reload.bind(this);
    }

    // This function can be used to update all users when changing the structure of the data
    /* 
    async updateUsers(list) {

        let updatedUsers = {
            users: list.map(u => [u.Username,
            {
                Role: u.Role,
                History: u.History,
                Team: getTeam(u.Username) || u.Team,
                SearchName: u.SearchName
            }])
        };

        function getTeam(username) {
            const user = userlist.filter(u => u.username === username)[0];
            if (user) return user.teamId;
            return false;
        }

        //console.log(updatedUsers);
        const res = await post('rpc', 'custom/updateUsers', updatedUsers, 'kinvey');
        console.log('done', res);
    }
    //*/

    componentDidMount() {
        this.loadParticipants();
    }

    getLastTeamId(list) {
        let lastId = 0;
        for (let user of list) {
            if (user.Team > lastId) {
                lastId = user.Team;
            }
        }
        return lastId;
    }

    async loadParticipants() {
        try {
            let list = await getAllUsers();
            let lastId = this.getLastTeamId(list);
            this.setState({ status: 1, list, lastId });

            // This function can be used to update all users when changing the structure of the data
            //this.updateUsers(list);
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
            this.setState({ status: -1 });
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
            main = <p style={{ color: "red" }}>Request error, see log for details.</p>
        } else if (this.state.status === 1) {
            main =
                <div>
                    <ParticipantList list={this.state.list} manage={true} lastId={this.state.lastId} />
                </div>;
        }

        return (
            <div className="Component-body">
                <div>
                    <button className="btn" onClick={this.reload}>&#8635;</button>
                </div>
                {main}
            </div>
        );
    }
}