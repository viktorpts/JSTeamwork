import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import {Link} from 'react-router-dom';
import Importer from './Importer';
import Assign from './Assign';
import Archive from './Archive';
import ManageParticipants from './ManageParticipants';

export default class AdminPanel extends Component {
    render() {
        return (
            <div>
                <Link to="/admin/import">Import Participants</Link>|
                <Link to="/admin/assign">Assign Teams</Link>|
                <Link to="/admin/teams">Manage Teams</Link>|
                <Link to="/admin/participants">Manage Participants</Link>
                <Switch>
                    <Route path="/admin/import" component={Importer}/>
                    <Route path="/admin/assign" component={Assign}/>
                    <Route path="/admin/teams" component={Archive}/>
                    <Route path="/admin/participants" component={ManageParticipants}/>
                </Switch>
            </div>
        );
    }
}