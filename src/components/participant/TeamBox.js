import React, {Component} from 'react';

export default class TeamBox extends Component {
    render() {
        return (
            <div>
                <h2>Team Info</h2>
                <p>For the current task, you have to collaborate with the following colleagues:</p>
                <ul>
                    {this.props.list.map(t => <li key={t.name}>{t.name} <span style={{color: 'blue'}}>{t.contact}</span></li>)}
                </ul>
            </div>
        )
    }
}