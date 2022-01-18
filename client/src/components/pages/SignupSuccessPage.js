import React from "react";
import { Link } from "react-router-dom";

import "./SignupSuccessPage.css";

function SignupSuccessPage(props) {
    return (
        <div className="page-container signup-login">
            <Link to="/signup" id="signup-title" className="page-title">
                sign up
            </Link>
            <div className="formpage-body signup-feedback">
                <p className="signup-feedback-text">Success!</p>
                <div className="button-container">
                    <Link className="action-button signup-actions" to="/login">
                        log in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignupSuccessPage;
