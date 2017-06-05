import React, {Component} from 'react';
import Participant from './Participant';

export default class Team extends Component {
    render() {
        let style = {
            display: "inline-block",
            border: "1px solid gray",
            margin: "0.25em",
            padding: "0.25em 1em 0.25em 1em"
        };

        return (
            <div style={style}>
                {this.props.list.map(row =>
                    <Participant key={row._id} user={row}/>)}
            </div>
        )
    }
}