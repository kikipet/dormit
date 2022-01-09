import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { validEmail } from './regex'

function SignupForm (props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passErr, setPassErr] = useState(false);
    const [signedUp, setSignUpStatus] = useState(false);

    /*
     * offer different name options (first+last or just one) depending on whether the signup-er is a person or an organization?
     * after signing up, go to a "redirect to login" page
     * probably better for it to actually be a different page, like "/signup/success" or something
     * the validation code is disorganized but it works :<
    */

    function handleEmailChange(value) {
        setEmail(value);
        setEmailErr(!validEmail.test(value) && value !== '');
    }

    function handleConfirmPassword(value) {
        setConfirmPassword(value);
        setPassErr(password !== value && value !== '');
    }

    function handleSubmit(event) {
        // submit
        console.log(name);
        console.log(email);
        console.log(password);

        setSignUpStatus(true);
        
        event.preventDefault();
    }

    // signed up successfully
    if (signedUp) {
        return (
            <div className='form-container signup-login-form-container'>
                <p id='signup-success'>Success!</p>
                <Link 
                    className='action-button signup-to-login-button' 
                    to='/login'>log in</Link>
            </div>
        )
    }
    // still filling out form
    return (
        <div className='form-container signup-login-form-container'>
            <div className='signup-login-redirect'><p>been here before? <Link to='/login'>log in</Link></p> </div>
            <form onSubmit={handleSubmit}>
                <div className='form-column'>
                    <label className='form-field'>
                        name
                        <input
                            className='form-input' 
                            name='name' 
                            type='text' 
                            value={name} 
                            onChange={e => setName(e.target.value)} />
                    </label>
                    <label className={((!validEmail.test(email) && email !== '') ? 'form-field-error' : 'form-field')}>
                        email
                        <input 
                            className='form-input' 
                            name='email' 
                            type='text' 
                            value={email} 
                            onChange={e => handleEmailChange(e.target.value)} />
                        {(emailErr ? 'invalid email' : '')}
                    </label>
                    <label className='form-field'>
                        password
                        <input 
                            className='form-input' 
                            name='password' 
                            type='password' 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} />
                    </label>
                    <label className={(passErr ? 'form-field-error' : 'form-field')}>
                        confirm password
                        <input 
                            className='form-input' 
                            name='confirmPassword' 
                            type='password' 
                            value={confirmPassword} 
                            onChange={e => handleConfirmPassword(e.target.value)} />
                        {(passErr ? "passwords don't match" : '')}
                    </label>
                    <div class='signup-login-action-button'>
                        <input
                            className='action-button signup-login-submit' 
                            name='signup'
                            type='submit'
                            value='sign up'/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;