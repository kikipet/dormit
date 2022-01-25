import React from "react";
import { Link, useParams } from "react-router-dom";

import SignupForm from "../modules/SignupForm";
import LoginForm from "../modules/LoginForm";

import "./SignupLoginPage.css";
import backgroundImage from "../../assets/dormit-line-signup.svg";

function SignupLoginPage(props) {
    if (props.type === "signup") {
        return (
            <div
                className="page-container signup-login"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <Link to="/signup" id="signup-title" className="page-title">
                    sign up
                </Link>
                <SignupForm />
            </div>
        );
    }
    let redirectPage = window.location.pathname.includes("redirect=")
        ? `/${useParams()["page"]}`
        : "/profile";
    return (
        <div
            className="page-container signup-login"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <Link to="/login" id="signup-title" className="page-title">
                log in
            </Link>
            <LoginForm handleLogin={props.handleLogin} redirectPage={redirectPage} />
        </div>
    );
}

export default SignupLoginPage;
