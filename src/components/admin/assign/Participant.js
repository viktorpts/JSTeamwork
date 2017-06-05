import React, {Component} from 'react';

export default class Participant extends Component {
    render() {
        let style = {
            color: "white",
            display: "inline-block",
            backgroundColor: "gray",
            margin: "0.25em",
            padding: "0.25em 1em 0.25em 1em"
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
            <span style={style}>{this.props.user.Name} ({this.props.user.Username})</span>
        )
    }
}