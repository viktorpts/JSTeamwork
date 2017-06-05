import React, {Component} from 'react';
import {parseUsers} from '../../services/repository';
import InputForm from './importer/InputForm';
import ParticipantTable from './importer/ParticipantTable';
import ParticipantCreator from './importer/ParticipantCreator';

export default class Importer extends Component {
    constructor(props) {
        super(props);

        this.state = {userList: [], formUserList: '', status: 0};

        // Bind event handlers
        this.onParseClick = this.onParseClick.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
        this.onImportClick = this.onImportClick.bind(this);
    }

    onParseClick(event) {
        event.preventDefault();

        let userList = parseUsers(this.state.formUserList);
        this.setState({userList: userList, status: 1});
    }

    onFormChange(event) {
        this.setState({formUserList: event.target.value});
    }

    async onImportClick(event) {
        this.setState({status: 2});
        // Send requests
    }

    render() {
        let main = null;
        switch (this.state.status) {
            case 0:
                main = <InputForm formUserList={this.state.formUserList}
                                  onFormChange={this.onFormChange}
                                  onParseClick={this.onParseClick}/>;
                break;
            case 1:
                main = <ParticipantTable list={this.state.userList} onImportClick={this.onImportClick}/>;
                break;
            case 2:
                main =
                    <div>
                        <p style={{color: "red"}}>Do not close this window until all tasks are finished!</p>
                        {this.state.userList.map(row =>
                            <ParticipantCreator key={row.username}
                                                username={row.username}
                                                name={row.name}
                                                contact={row.contact}
                                                role={row.role}/>)}
                    </div>;
                break;
        }

        return (
            <div>
                <h2>Participant Importer</h2>
                {main}
            </div>
        );
    }
}