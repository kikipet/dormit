import React from "react";
import { Link } from "react-router-dom";

import backgroundSmall from "../../assets/dormit-plane-landing-small.svg";
import backgroundMed from "../../assets/dormit-plane-landing-med.svg";
import backgroundLarge from "../../assets/dormit-plane-landing-large.svg";

import "./LandingPage.css";

function LandingPage(props) {
    let backgroundStyle = {};
    if (window.innerWidth >= 1201) {
        backgroundStyle = { backgroundImage: `url(${backgroundLarge})` };
    } else if (window.innerWidth >= 769) {
        backgroundStyle = { backgroundImage: `url(${backgroundMed})` };
    } else if (window.innerWidth >= 541) {
        backgroundStyle = { backgroundImage: `url(${backgroundSmall})` };
    }
    return (
        <div id="landing" className="page-container">
            <div className="landing-page-container" style={backgroundStyle}>
                <div className="landing-splash-content">
                    <h1 className="landing-splash-title">dormit</h1>
                    <p className="landing-splash-blurb">All of your dormspam in one place.</p>
                    <div className="landing-splash-button-container">
                        <Link
                            className="action-button  landing-splash-button landing-signup-button"
                            to="/signup"
                        >
                            Sign up
                        </Link>
                        <Link
                            className="action-button landing-splash-button landing-login-button"
                            to="/login"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
