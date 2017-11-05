import React, { Component } from 'react';
import Participant from './Participant';

export default class ParticipantList extends Component {
    constructor(props) {
        super(props);

        this.state = { showName: true, showUser: false };

        this.toggleName = this.toggleName.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.toggleBoth = this.toggleBoth.bind(this);
    }

    toggleName() {
        this.setState({ showName: true, showUser: false });
    }

    toggleUser() {
        this.setState({ showName: false, showUser: true });
    }

    toggleBoth() {
        this.setState({ showName: true, showUser: true });
    }

    render() {
        return (
            <div>
                <div>
                    <p>Current highest team ID: {this.props.lastId}</p>
                    <button className="btn" onClick={this.toggleName}>Full Names</button>
                    <button className="btn" onClick={this.toggleUser}>Usernames</button>
                    <button className="btn" onClick={this.toggleBoth}>Both</button>
                </div>
                <div>
                    {this.props.list.filter(e => e.Role === 'In Class').map(row =>
                        <Participant showName={this.state.showName}
                            showUser={this.state.showUser}
                            manage={this.props.manage}
                            key={row._id}
                            user={row} />)}
                </div>
                <div>
                    {this.props.list.filter(e => e.Role === 'Onsite').map(row =>
                        <Participant showName={this.state.showName}
                            showUser={this.state.showUser}
                            manage={this.props.manage}
                            key={row._id}
                            user={row} />)}
                </div>
                <div>
                    {this.props.list.filter(e => e.Role === 'Online').map(row =>
                        <Participant showName={this.state.showName}
                            showUser={this.state.showUser}
                            manage={this.props.manage}
                            key={row._id}
                            user={row} />)}
                </div>
                <div>
                    {this.props.list.filter(e => e.Role === 'DQ').map(row =>
                        <Participant showName={this.state.showName}
                            showUser={this.state.showUser}
                            manage={this.props.manage}
                            key={row._id}
                            user={row} />)}
                </div>
            </div>
        )
    }
}