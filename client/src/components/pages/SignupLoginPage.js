import React, { Component } from 'react';

import SignupForm from '../modules/SignupForm'
import LoginForm from '../modules/LoginForm'

import './SignupLoginPage.css'

class SignupLoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.type === 'signup') {
            return (
                <div className='page-container signup-login'>
                    <h1 id='signup-title' className='page-title'>sign up</h1>
                    <SignupForm />
                </div>
            );
        }
        return (
            <div id='signup-login' className='page-container'>
            <h1 id='signup-title' className='page-title'>log in</h1>
                <LoginForm />
            </div>
        );
    }
}

export default SignupLoginPage;
