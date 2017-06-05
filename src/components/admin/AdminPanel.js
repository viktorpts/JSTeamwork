import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import {Link} from 'react-router-dom';
import Importer from './Importer';
import Assign from './Assign';

export default class AdminPanel extends Component {
    render() {
        return (
            <div>
                <Link to="/admin/import">Import Participants</Link>|
                <Link to="/admin/assign">Assign Teams</Link>|
                <Link to="/admin/manage">Manage Teams</Link>
                <Switch>
                    <Route path="/admin/import" component={Importer}/>
                    <Route path="/admin/assign" component={Assign}/>
                </Switch>
            </div>
        );
    }
}