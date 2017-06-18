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
        let style = {
            color: "white",
            display: "inline-block",
            backgroundColor: "gray",
            margin: "0.25em",
            padding: "0.25em 1em 0.25em 1em"
        };

        if (this.props.manage) {
            style.display = "block";
        }

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
            <span style={style}>{this.props.user.Name} ({this.props.user.Username})&nbsp;
                {this.props.manage && <button onClick={(event) => this.disqualify(event)} style={btnStyle}>Disqualify</button>}</span>
        )
    }
}