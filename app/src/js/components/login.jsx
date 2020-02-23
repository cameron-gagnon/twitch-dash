import React from 'react';

import ValueInput from 'js/components/valueInput';
import Backend, { cookie_name } from 'js/services/backend';

import 'styles/css/App.css';

const backend = new Backend();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
    }

    componentDidMount() {
        // redirect to main page if already logged in
        if (document.cookie.indexOf(cookie_name) >= 0) {
            this.props.history.push('/');
        } else {
            console.log("No cookie set on login page:", document.cookie)
        }
    }

    redirectToTarget() {
        console.log('Success! Logging in!');
        this.props.history.push('/');
    }

    setError(errorMsg) {
        this.setState({
            error: errorMsg
        });
    }

    submit(secret) {
        console.log(`Submitting ${secret}`)
        backend.login(
            { login_secret: secret },
            this.redirectToTarget.bind(this),
            this.setError.bind(this)
        );
    }

    render() {
        return (
            <div>
                <ValueInput
                    onSubmit={this.submit.bind(this)}
                    text='Login'
                    type='password'
                />
                <div className='error'>
                    {this.state.error}
                </div>
            </div>
        )
    }
}

export default Login;