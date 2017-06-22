// Framework
import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import logo from './software-university-logo.png';
import './App.css';

// Components
import ParticipantHome from './components/ParticipantHome';
import AdminHome from './components/AdminHome';

class App extends Component {
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
                <div className="Component-header footer"><span>&copy; 2017</span></div>
            </div>
        );
    }
}

export default App;
