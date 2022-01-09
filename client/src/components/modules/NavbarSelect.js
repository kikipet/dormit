import React from 'react';
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";

function NavbarSelect() {
    if (window.innerWidth <= 540) {
        return <NavbarMobile showDropDown={false} />;
    }
    return <Navbar />;
}

export default NavbarSelect;