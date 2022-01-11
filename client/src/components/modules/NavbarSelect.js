import React from "react";
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";

function NavbarSelect(props) {
    if (window.innerWidth <= 540) {
        return (
            <NavbarMobile
                userId={props.userId}
                handleLogout={props.handleLogout}
                showDropDown={false}
            />
        );
    }
    return <Navbar userId={props.userId} handleLogout={props.handleLogout} />;
}

export default NavbarSelect;
