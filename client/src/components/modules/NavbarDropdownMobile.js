import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NavbarDropdownMobile(props) {
    let signupProfileLink = (
        <div className="navbar-link-container">
            <NavLink
                className={({ isActive }) =>
                    isActive ? "navbar-link navbar-link-active" : "navbar-link"
                }
                to="/signup"
                onClick={props.onClick}
            >
                sign up
            </NavLink>
        </div>
    );
    let logInOutLink = (
        <div className="navbar-link-container">
            <NavLink
                className={({ isActive }) =>
                    isActive ? "navbar-link navbar-link-active" : "navbar-link"
                }
                to="/login"
                onClick={props.onClick}
            >
                log in
            </NavLink>
        </div>
    );
    if (props.userId !== null) {
        signupProfileLink = (
            <div className="navbar-link-container">
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "navbar-link navbar-link-active" : "navbar-link"
                    }
                    to="/profile"
                    onClick={props.onClick}
                >
                    profile
                </NavLink>
            </div>
        );
        logInOutLink = (
            <div className="navbar-link-container">
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "navbar-link navbar-link-active" : "navbar-link"
                    }
                    to="/"
                    onClick={(e) => {
                        props.handleLogout();
                        props.onClick(e);
                    }}
                >
                    log out
                </NavLink>
            </div>
        );
    }
    if (props.show) {
        return (
            <menu className="navbar-mobile-dropdown">
                <div className="navbar-link-container">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "navbar-link navbar-link-active" : "navbar-link"
                        }
                        to="/"
                        onClick={props.onClick}
                    >
                        home
                    </NavLink>
                </div>
                <div className="navbar-link-container">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "navbar-link navbar-link-active" : "navbar-link"
                        }
                        to="/sendit"
                        onClick={props.onClick}
                    >
                        sendit
                    </NavLink>
                </div>
                <div className="navbar-link-container">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "navbar-link navbar-link-active" : "navbar-link"
                        }
                        to="/findit"
                        onClick={props.onClick}
                    >
                        findit
                    </NavLink>
                </div>
                {signupProfileLink}
                {logInOutLink}
            </menu>
        );
    }
    return <></>;
}

export default NavbarDropdownMobile;
