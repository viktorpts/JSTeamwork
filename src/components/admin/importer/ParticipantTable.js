import React, {Component} from 'react';

export default class ParticipantTable extends Component {
    render() {
        return (
            <div>
                <table className="import-table">
                    <caption>Participants</caption>
                    <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Full name</th>
                        <th>Contact</th>
                        <th>Role</th>
                    </tr>
                    {this.props.list.map(row =>
                        <tr key={row.username}>
                            <td>{row.username}</td>
                            <td>{row.name}</td>
                            <td>{row.contact}</td>
                            <td style={{color: row.role === 'Online' ? "blue" : "black"}}>{row.role}</td>
                        </tr>)}
                    </tbody>
                </table>
                <button className="btn" onClick={this.props.onImportClick}>Import</button>
            </div>
        )
    }
}