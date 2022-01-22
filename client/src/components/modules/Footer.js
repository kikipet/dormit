import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

function Footer(props) {
    return (
        <menu className="footer-container">
            <Link to="/about" className="footer-link">
                About
            </Link>
            <Link
                to="#"
                onClick={(e) => {
                    window.location = "mailto:dormspam-admin@mit.edu";
                    e.preventDefault();
                }}
                className="footer-link"
            >
                Contact
            </Link>
        </menu>
    );
}

export default Footer;
