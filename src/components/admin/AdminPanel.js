import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import {NavLink} from 'react-router-dom';
import Importer from './Importer';
import Assign from './Assign';
import Archive from './Archive';
import ManageParticipants from './ManageParticipants';

export default class AdminPanel extends Component {
    render() {
        return (
            <div>
                <header className="navigation Component-header">
                    <NavLink activeClassName="active-link" to="/admin/import">Import Participants</NavLink>
                    <NavLink activeClassName="active-link" to="/admin/assign">Assign Teams</NavLink>
                    <NavLink activeClassName="active-link" to="/admin/teams">Manage Teams</NavLink>
                    <NavLink activeClassName="active-link" to="/admin/participants">Manage Participants</NavLink>
                </header>
                <Switch>
                    <Route exact path="/admin" component={InlineInfo}/>
                    <Route path="/admin/import" component={Importer}/>
                    <Route path="/admin/assign" component={Assign}/>
                    <Route path="/admin/teams" component={Archive}/>
                    <Route path="/admin/participants" component={ManageParticipants}/>
                </Switch>
            </div>
        );
    }
}

function InlineInfo(prop) {
    return <p>Please, select category.</p>;
}