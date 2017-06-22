import React, {Component} from 'react';

export default class InputForm extends Component {
    render() {
        return (
            <form>
                <div>
                        <textarea name="userList"
                                  value={this.props.formUserList}
                                  onChange={this.props.onFormChange}></textarea>
                </div>
                <div>
                    <input className="btn" type="submit" value="Parse" onClick={this.props.onParseClick}/>
                </div>
            </form>
        )
    }
}