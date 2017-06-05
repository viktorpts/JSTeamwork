import React, {Component} from 'react';

export default class AdminLoginForm extends Component {
    render() {
        return (
            <form>
                <label htmlFor="username">Username: </label>
                <input onChange={this.props.onInputChange}
                       name="username"
                       type="text"
                       value={this.props.username}/>
                <label htmlFor="password">Username: </label>
                <input onChange={this.props.onInputChange}
                       name="password"
                       type="password"
                       value={this.props.password}/>
                <input type="submit" value="Login" onClick={this.props.onFormSubmit}/>
            </form>
        )
    }
}