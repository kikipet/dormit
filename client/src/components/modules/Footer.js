import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css'

function Footer(props) {
    return (
        <menu className='footer-container'>
            <Link to='/about' className='footer-link'>About</Link>
            <Link to='mailto:dormspam-admin@mit.edu' className='footer-link'>Contact</Link>
        </menu>
    )
}

export default Footer;