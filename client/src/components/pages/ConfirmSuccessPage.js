import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get, isEmpty } from "../../utilities";

import "./SignupSuccessPage.css";

function ConfirmSuccessPage(props) {
    const token = useParams()["confirmtoken"];
    const [checked, setChecked] = useState(false);
    const [pageText, setPageText] = useState(
        <div className="page-container signup-login">
            <Link to="/signup" id="signup-title" className="page-title">
                sign up
            </Link>
            <div className="formpage-body signup-feedback">
                <p className="signup-feedback-text">loading...</p>
            </div>
        </div>
    );
    if (!checked) {
        console.log(token);
        get("/api/confirmuser", { confirmToken: token }).then((res) => {
            setChecked(true);
            if (isEmpty(res)) {
                setPageText(
                    <div className="formpage-body signup-feedback">
                        <p className="signup-feedback-text">
                            Your confirmation link is invalid. Sign up for an account below:
                        </p>
                        <Link className="action-button signup-actions" to="/signup">
                            sign up
                        </Link>
                    </div>
                );
            } else if (res.result === "dupe") {
                setPageText(
                    <div className="formpage-body signup-feedback">
                        <p className="signup-feedback-text">
                            Your account has already been confirmed.
                        </p>
                        <Link className="action-button signup-actions" to="/login">
                            log in
                        </Link>
                    </div>
                );
            } else {
                setPageText(
                    <div className="formpage-body signup-feedback">
                        <p className="signup-feedback-text">Your account has been confirmed!</p>
                        <Link className="action-button signup-actions" to="/login">
                            log in
                        </Link>
                    </div>
                );
            }
        });
    }
    return (
        <div className="page-container signup-login">
            <Link to="/signup" id="signup-title" className="page-title">
                sign up
            </Link>
            {pageText}
        </div>
    );
}

export default ConfirmSuccessPage;
