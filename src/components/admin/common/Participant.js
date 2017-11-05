import React, { Component } from 'react';
import { updateUser } from '../../../services/repository';

export default class Participant extends Component {
    constructor(props) {
        super(props);

        this.state = { selectedRole: this.props.user.Role, selectedTeamId: this.props.user.Team };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        switch (event.target.name) {
            case "selectedRole":
                this.setState({ selectedRole: event.target.value });
                break;
            case "selectedTeamId":
                if (isNaN(event.target.value)) {
                    break;
                }
                this.setState({ selectedTeamId: Number(event.target.value) });
                break;
            default:
        }
    }

    async apply(event) {
        let btn = event.target;
        btn.disabled = true;
        btn.innerHTML = "&#9744;";
        let newValues = Object.assign({}, this.props.user);
        newValues.Role = this.state.selectedRole;
        newValues.Team = this.state.selectedTeamId;
        try {
            await updateUser(newValues);
            btn.innerHTML = "&#9745;";
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
            btn.innerHTML = "&#9746;";
        }
    }

    render() {
        let className = 'participant';

        let controls = (
            <div>
                <label htmlFor="teamId">Team ID:</label>
                <input
                    style={{ width: "5em" }}
                    type="text" name="selectedTeamId"
                    value={this.state.selectedTeamId}
                    onChange={this.onChange} />
                <select className="select" name="selectedRole" value={this.state.selectedRole} onChange={this.onChange}>
                    <option value="In Class">In Class</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Online">Online</option>
                    <option value="DQ">DQ</option>
                </select>
                <button className="btn" onClick={(event) => this.apply(event)}>Apply</button>
            </div>
        );

        switch (this.props.user.Role) {
            case "In Class":
                className += ' present';
                break;
            case "Online":
                className += ' online';
                break;
            case "DQ":
                className += ' dq';
                break;
        }


        return (
            <div className={className}>
                {this.props.showName && <span className="participant-info">{this.props.user.Name}</span>}
                {this.props.showUser && <span className="participant-info">{this.props.user.Username}</span>}
                {this.props.manage && controls}
            </div>
        )
    }
}