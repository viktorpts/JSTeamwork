import React, {Component} from 'react';

export default class SignInForm extends Component {
    render() {
        return (
            <div>
                <p>Sign in with your username</p>
                <form onSubmit={this.props.onSignIn}>
                    <div>
                    <input type="text"
                           value={this.props.participant}
                           onChange={this.props.onChange}/>
                    </div>
                    <div>
                    <input className="btn"
                           type="submit"
                           value="Sign In"/>
                    </div>
                </form>
                {this.props.hint === -1 && <p style={{color: "red"}}>Username not found.</p>}
            </div>
        )
    }
}