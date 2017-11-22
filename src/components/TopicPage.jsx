import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Services
import { createImplicitUser } from '../services/auth';
import { get, post } from '../services/requester';

class TopicPage extends Component {
    constructor(props) {
        super(props);

        this.state = { auth: 0, status: 0, topic: '' };

        this.onChose = this.onChose.bind(this);
    }

    componentDidMount() {
        this.authenticate();
    }

    async authenticate() {
        try {
            await createImplicitUser();
            this.setState({ auth: 1 });
            this.getCurrentTopic();
        } catch (err) {
            console.error('Request failed');
            console.dir(err);
            this.setState({ auth: -1 });
        }
    }

    async getCurrentTopic() {
        const id = this.props.match.params.id;
        const data = await get('appdata', 'Participants/' + id);
        const slotsWeb = 6 - (await get('appdata', `Participants?query={"Topic":"web"}`)).length;
        const slotsDesk = 13 - (await get('appdata', `Participants?query={"Topic":"desktop"}`)).length;
        if (data.Topic) {
            this.setState({ status: 2, topic: data.Topic === 'web' ? 'Web Application' : 'Desktop Application', slotsWeb, slotsDesk});
        } else {
            this.setState({ status: 1, slotsWeb, slotsDesk});
        }
    }

    async setTopic(id, selection) {
        try {
            await post('rpc', 'custom/topic', { id, selection });
            const topic = selection === 'web' ? 'Web Application' : 'Desktop Application';
            const slotsWeb = this.state.slotsWeb - (selection === 'web' ? 1 : 0);
            const slotsDesk = this.state.slotsDesk - (selection === 'desktop' ? 1 : 0);
            this.setState({ topic, status: 2, slotsWeb, slotsDesk });
        } catch (err) {
            console.log(err);
            this.setState({ status: -1 });
        }
    }

    async onChose(e) {
        this.setState({ loading: true });
        const id = this.props.match.params.id;
        switch (e.target.name) {
            case 'web':
                await this.setTopic(id, 'web');
                break;
            case 'desktop':
                await this.setTopic(id, 'desktop');
                break;
            case 'repick':
                const slotsWeb = this.state.slotsWeb + (this.state.topic === 'Web Application' ? 1 : 0);
                const slotsDesk = this.state.slotsDesk + (this.state.topic === 'Desktop Application' ? 1 : 0);
                this.setState({ status: 1, slotsWeb, slotsDesk });
                break;
        }
        this.setState({ loading: false });
    }

    render() {
        let main = <p>Authenticating...</p>;
        if (this.state.auth === 1) {
            if (this.state.status === 0) {
                main = (
                    <div>
                        <p>Loading &hellip;</p>
                    </div>
                );
            } else if (this.state.status === 1) {
                main = (
                    <div>
                        <p>Please, chose your project topic:</p>
                        <button className="btn" name="web" onClick={this.onChose} disabled={this.state.loading || this.state.slotsWeb === 0}>Web Application ({this.state.slotsWeb} slots remaining)</button>
                        <button className="btn" name="desktop" onClick={this.onChose} disabled={this.state.loading}>Desktop Application ({this.state.slotsDesk  || this.state.slotsDesk === 0} slots remaining)</button>
                    </div>
                );
            } else if (this.state.status === 2) {
                main = (
                    <div>
                        <p>You have selected <span style={{ fontWeight: 'bold' }}>{this.state.topic}</span>.</p>
                        <button className="btn" name="repick" onClick={this.onChose} disabled={this.state.loading}>Change Topic</button>
                    </div>
                );
            } else if (this.state.status === -1) {
                main = (
                    <div>
                        <p style={{ color: 'red' }}>There was an error, check the console for details.</p>
                    </div>
                );
            }
        } else if (this.state.auth === -1) {
            main = <p style={{ color: "red" }}>There was an authentication error.</p>;
        }

        return (
            <div>
                <div className="Component-header"><span className="title">Teamwork Assistant</span></div>
                {main}
            </div>
        );
    }
}

export default withRouter(TopicPage);