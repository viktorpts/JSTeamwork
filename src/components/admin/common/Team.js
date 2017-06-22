import React, {Component} from 'react';
import Participant from './Participant';

export default class Team extends Component {
    render() {
        if (this.props.list.length === 0) return null;

        return (
            <div className="team">
                {this.props.list.map(row =>
                    <Participant showName={this.props.showName}
                                 showUser={this.props.showUser}
                                 key={row._id}
                                 user={row}/>)}
            </div>
        )
    }
}