import React, {Component} from 'react';

export default class AdminLoginForm extends Component {
    render() {
        return (
            <form>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input onChange={this.props.onInputChange}
                           name="username"
                           type="text"
                           value={this.props.username}/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input onChange={this.props.onInputChange}
                           name="password"
                           type="password"
                           value={this.props.password}/>
                </div>
                <div>
                    <input type="submit" value="Login" onClick={this.props.onFormSubmit}/>
                </div>
            </form>
        )
    }
}