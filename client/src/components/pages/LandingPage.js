import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";

function LandingPage(props) {
    return (
        <div id="landing" className="page-container landing-page-container">
            <div className="landing-splash-content">
                <h1 className="landing-splash-title">dormit</h1>
                <p className="landing-splash-blurb">All of your dormspam in one place.</p>
                <div className="landing-splash-button-container">
                    <Link className="landing-splash-button landing-signup-button" to="/signup">
                        Sign up
                    </Link>
                    <Link className="landing-splash-button landing-login-button" to="/login">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
