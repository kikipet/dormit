import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';

import NavbarDropdownMobile from './NavbarDropdownMobile';
import './Navbar.css'

function NavbarMobile(props) {
    const [showDropDown, setDropDown] = useState(props.showDropDown);

    function toggleDropDown() {
        setDropDown(!showDropDown);
    }

    // will need to be different depending on whether user is logged in or not
    return (
        <nav className='navbar-mobile-container'>
            <div className='navbar-mobile-top'>
                <button class='menu-toggle' onClick={toggleDropDown}>
                    <IoMenu />
                </button>
                <NavLink id='dormit-logo-link-mobile' 
                    className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}
                    to='/'>
                    <img src={'../assets/dormit-plane.png'} />dormit</NavLink>
            </div>
            <NavbarDropdownMobile show={showDropDown} />
        </nav>
    )
}

export default NavbarMobile;