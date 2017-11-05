import React, {Component} from 'react';
import TeamBox from './TeamBox';

export default class ParticipantInfo extends Component {
    render() {
        let teamInfo = <p>You have no team assigned for the current task. Wait for team info to be updated.</p>;
        if (this.props.data.teammates.length > 0) {
            teamInfo = <TeamBox list={this.props.data.teammates} />;
        }

        return (
            <div>
                <p>Welcome, {this.props.data.currentUser}. <button className="btn" name="changeUser" onClick={this.props.userChange}>Change user</button></p>
                <p>You are currently marked as {this.props.data.role}.</p>
                {/* Present button removed this.props.data.role === 'Onsite' ? <button className="btn" name="present" onClick={this.props.present}>Mark me as present in class</button> : null*/}
                {teamInfo}
            </div>
        )
    }
}