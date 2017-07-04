import React, {Component} from 'react';

export default class TeamBox extends Component {
    render() {
        return (
            <div>
                <h2>Team Info</h2>
                <p>For the current task, you have to collaborate with the following colleagues:</p>
                <table className="Teammates">
                    <tbody>
                    {this.props.list.map(t =>
                        <tr key={t.name}>
                            <td><a className="btn" href={`https://softuni.bg/users/profile/show/${t.username}`}>&#8505;</a></td>
                            <td>{t.name}</td>
                            <td><span style={{color: 'blue'}}>{t.contact}</span></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}