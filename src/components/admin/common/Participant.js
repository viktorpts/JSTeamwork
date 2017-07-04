import React, {Component} from 'react';
import {updateUser} from '../../../services/repository';

export default class Participant extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedRole: this.props.user.Role}

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({selectedRole: event.target.value});
    }

    async apply(event) {
        let btn = event.target;
        btn.disabled = true;
        btn.innerHTML = "&#9744;";
        let newValues = Object.assign({}, this.props.user);
        newValues.Role = this.state.selectedRole;
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
        let style = {};

        let controls =
            <div>
                <select className="select" value={this.state.selectedRole} onChange={this.onChange}>
                    <option value="In Class">In Class</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Online">Online</option>
                    <option value="DQ">DQ</option>
                </select>
                <button className="btn" onClick={(event) => this.apply(event)}>Apply</button>
            </div>;

        switch (this.props.user.Role) {
            case "In Class":
                style.backgroundColor = "Green";
                break;
            case "Online":
                style.backgroundColor = "Blue";
                break;
            case "DQ":
                style.backgroundColor = "Red";
                break;
        }


        return (
            <div className="participant" style={style}>
                {this.props.showName && <span className="participant-info">{this.props.user.Name}</span>}
                {this.props.showUser && <span className="participant-info">{this.props.user.Username}</span>}
                {this.props.manage && controls}
            </div>
        )
    }
}