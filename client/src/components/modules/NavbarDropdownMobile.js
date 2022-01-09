import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavbarDropdownMobile(props) {
    if (props.show) {
        return (
            <menu className='navbar-mobile-dropdown'>
                <div className='navbar-link-container'>
                <NavLink 
                    className={({ isActive }) => (isActive ? 'navbar-link navbar-link-active' : 'navbar-link')}
                    to='/'>
                    home</NavLink>
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
            </menu>
        );
    }
    return (
        <></>
    );
}

export default NavbarDropdownMobile;