import React, {Component} from 'react';
import Team from './Team';

export default class TeamList extends Component {
    constructor(props) {
        super(props);

        this.state = {showName: true, showUser: false};

        this.toggleName = this.toggleName.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.toggleBoth = this.toggleBoth.bind(this);
    }

    toggleName() {
        this.setState({showName: true, showUser: false});
    }

    toggleUser() {
        this.setState({showName: false, showUser: true});
    }

    toggleBoth() {
        this.setState({showName: true, showUser: true});
    }

    render() {
        return (
            <div>
                <div>
                    <button className="btn" onClick={this.toggleName}>Full Names</button>
                    <button className="btn" onClick={this.toggleUser}>Usernames</button>
                    <button className="btn" onClick={this.toggleBoth}>Both</button>
                </div>
                {this.props.teams.map(team =>
                    <Team showName={this.state.showName}
                          showUser={this.state.showUser}
                          key={team.map(e => e.Username).join('')}
                          list={team}/>)}
            </div>
        )
    }
}