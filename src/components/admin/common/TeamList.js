import React, {Component} from 'react';
import Team from './Team';

export default class TeamList extends Component {
    render() {
        return (
            <div>
                {this.props.teams.map(team =>
                    <Team key={team.map(e => e.Username).join('')}
                          list={team}/>)}
            </div>
        )
    }
}