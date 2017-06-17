import React, {Component} from 'react';

export default class DQInfo extends Component {
    render() {
        return (
            <div>
                <p>Welcome, {this.props.data.currentUser}. <button name="changeUser" onClick={this.props.userChange}>Change user</button></p>
                <p style={{color: "red"}}>You have been disqualified for non-participation.</p>
                <p>Please, contact the administration if you think this has happened in error.</p>
            </div>
        )
    }
}