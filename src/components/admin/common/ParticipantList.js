import React, {Component} from 'react';
import Participant from './Participant';

export default class ParticipantList extends Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.list.filter(e => e.Role === 'In Class').map(row =>
                        <Participant manage={this.props.manage} key={row._id} user={row}/>)}
                </div>
                <div>
                    {this.props.list.filter(e => e.Role === 'Onsite').map(row =>
                        <Participant manage={this.props.manage} key={row._id} user={row}/>)}
                </div>
                <div>
                    {this.props.list.filter(e => e.Role === 'Online').map(row =>
                        <Participant manage={this.props.manage} key={row._id} user={row}/>)}
                </div>
                <div>
                    {this.props.list.filter(e => e.Role === 'DQ').map(row =>
                        <Participant manage={this.props.manage} key={row._id} user={row}/>)}
                </div>
            </div>
        )
    }
}