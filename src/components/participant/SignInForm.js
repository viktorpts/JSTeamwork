import React, {Component} from 'react';

export default class SignInForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.onSignIn}>
                    <input type="text"
                           value={this.props.participant}
                           onChange={this.props.onChange}/>
                    <input type="submit"
                           value="Sign In"/>
                </form>
                {this.props.hint === -1 && <p style={{color: "red"}}>Username not found.</p>}
            </div>
        )
    }
}