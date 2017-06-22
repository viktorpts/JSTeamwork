import React, {Component} from 'react';
import {updateUser} from '../../../services/repository';

export default class Participant extends Component {
    async disqualify(event) {
        let btn = event.target;
        btn.disabled = true;
        btn.textContent = "Working...";
        let newValues = Object.assign({}, this.props.user);
        newValues.Role = 'DQ';
        try {
            await updateUser(newValues);
            btn.textContent = "Done";
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
            btn.textContent = "Request failed";
        }
    }

    render() {
        let style = {};

        let btnStyle = {
            color: "red"
        };

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
                {this.props.manage &&
                <button className="btn participant-info" onClick={(event) => this.disqualify(event)} style={btnStyle}>
                    Disqualify</button>}
            </div>
        )
    }
}