import React, {Component} from 'react';

export default class SignInForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSignIn}>
                <input type="text"
                       value={this.props.participant}
                       onChange={this.props.onChange}/>
                <input type="submit"
                       value="Sign In"/>
            </form>
        )
    }
}