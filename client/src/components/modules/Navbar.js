import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css'

function Navbar(props) {
    // will need to be different depending on whether user is logged in or not
    return (
        <nav className='navbar-container'>
            <div id='navbar-left' className='navbar-section'>
                <div className='navbar-link-container'>
                <NavLink id='dormit-logo-link' 
                    className={({ isActive }) => (isActive ? 'navbar-link navbar-link-active' : 'navbar-link')}
                    to='/'>
                    dormit</NavLink>
                </div>
                <div className='navbar-link-container'>
                <NavLink 
                    className={({ isActive }) => (isActive ? 'navbar-link navbar-link-active' : 'navbar-link')}
                    to='/sendit'>
                    sendit</NavLink>
                </div>
                <div className='navbar-link-container'>
                <NavLink 
                    className={({ isActive }) => (isActive ? 'navbar-link navbar-link-active' : 'navbar-link')}
                    to='/findit'>
                    findit</NavLink>
                </div>
            </div>
            <div id='navbar-right' className='navbar-section'>
                <div className='navbar-link-container'>
                <NavLink 
                    className={({ isActive }) => (isActive ? 'navbar-link navbar-link-active' : 'navbar-link')}
                    to='/signup'>
                    sign up</NavLink>
                </div>
                <div className='navbar-link-container'>
                <NavLink 
                    className={({ isActive }) => (isActive ? 'navbar-link navbar-link-active' : 'navbar-link')}
                    to='/login'>
                    log in</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;