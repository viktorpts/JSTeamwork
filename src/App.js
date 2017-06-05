// Framework
import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import logo from './logo.svg';
import './App.css';

// Components
import ParticipantHome from './components/ParticipantHome';
import AdminHome from './components/AdminHome';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
                <Switch>
                    <Route exact path="/" component={ParticipantHome}/>
                    <Route path="/admin" component={AdminHome}/>
                </Switch>
            </div>
        );
    }
}

export default App;
