import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

import NavbarDropdownMobile from "./NavbarDropdownMobile";

import "./Navbar.css";
import logo from "../../assets/dormit-plane.png";

function NavbarMobile(props) {
    const [showDropDown, setDropDown] = useState(props.showDropDown);

    function toggleDropDown() {
        setDropDown(!showDropDown);
    }

    // will need to be different depending on whether user is logged in or not
    return (
        <nav className="navbar-mobile-container">
            <div className="navbar-mobile-top">
                <button class="menu-toggle" onClick={toggleDropDown}>
                    <IoMenu />
                </button>
                <NavLink
                    className={`dormit-logo-link-mobile ${({ isActive }) =>
                        isActive ? "navbar-link-active" : "navbar-link"}`}
                    to="/"
                >
                    dormit{"  "}
                    <img className="navbar-logo" src={logo} />
                </NavLink>
            </div>
            <NavbarDropdownMobile
                show={showDropDown}
                onClick={(e) => setDropDown(false)}
                userId={props.userId}
                handleLogout={props.handleLogout}
            />
        </nav>
    );
}

export default NavbarMobile;
