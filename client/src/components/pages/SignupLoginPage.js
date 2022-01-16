import React from "react";
import { Link } from "react-router-dom";

import SignupForm from "../modules/SignupForm";
import LoginForm from "../modules/LoginForm";

import "./SignupLoginPage.css";

function SignupLoginPage(props) {
    if (props.type === "signup") {
        return (
            <div className="page-container signup-login">
                <Link to="/signup" id="signup-title" className="page-title">
                    sign up
                </Link>
                <SignupForm />
            </div>
        );
    }
    return (
        <div id="signup-login" className="page-container">
            <Link to="/login" id="signup-title" className="page-title">
                log in
            </Link>
            <LoginForm handleLogin={props.handleLogin} />
        </div>
    );
}

export default SignupLoginPage;
