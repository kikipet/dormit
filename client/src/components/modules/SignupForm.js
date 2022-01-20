import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validEmail } from "./regex";
import { get, post, isEmpty } from "../../utilities";

function SignupForm(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passErr, setPassErr] = useState(false);
    const [signedUp, setSignUpStatus] = useState(false);
    const [errMessages, setErrMessages] = useState([]);
    const [errMessageDiv, setErrContent] = useState(<div className="signup-error-boxes"></div>);
    const navigate = useNavigate();

    /*
     * offer different name options (first+last or just one) depending on whether the signup-er is a person or an organization?
     * the validation code is disorganized but it works :<
     */

    function handlePassword(value) {
        setPassword(value);
        setPassErr(confirmPassword !== value && confirmPassword !== "");
    }

    function handleConfirmPassword(value) {
        setConfirmPassword(value);
        setPassErr(password !== value && value !== "");
    }

    function handleSubmit(event) {
        let newErrList = [];
        if (!validEmail.test(email) || email === "") {
            newErrList.push("invalid email");
        }
        if (confirmPassword !== password) {
            newErrList.push("passwords don't match");
        }
        setErrMessages(newErrList);
        if (newErrList.length === 0) {
            // submit
            get("/api/userbyemail", { email: email }).then((result) => {
                if (isEmpty(result)) {
                    post("/api/createuser", { name: name, email: email, password: password }).then(
                        (res) => {
                            if (isEmpty(res)) {
                                navigate("/signup/success");
                            }
                        }
                    );
                } else {
                    newErrList.push("Email already exists");
                    setErrMessages(newErrList);
                }
            });
        }

        event.preventDefault();
    }

    // render errors
    if (errMessages.length > 0) {
        setErrContent(
            <div className="signup-error-boxes">
                {errMessages.map((message) => (
                    <p className="error-box">{message}</p>
                ))}
            </div>
        );
        setErrMessages([]);
    }

    // still filling out form
    return (
        <div className="form-container signup-login-form-container">
            <div className="signup-login-redirect">
                <p>
                    been here before? <Link to="/login">log in</Link>
                </p>{" "}
            </div>
            {errMessageDiv}
            <form onSubmit={handleSubmit}>
                <div className="form-column">
                    <label className="form-field">
                        name
                        <input
                            className="form-input"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="form-field">
                        email
                        <input
                            className="form-input"
                            name="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="form-field">
                        password
                        <input
                            className="form-input"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => handlePassword(e.target.value)}
                        />
                    </label>
                    <label className={passErr ? "form-field-error" : "form-field"}>
                        confirm password
                        <input
                            className="form-input"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => handleConfirmPassword(e.target.value)}
                        />
                        {passErr ? "passwords don't match" : ""}
                    </label>
                    <div className="signup-login-action-button">
                        <input
                            className="action-button signup-login-submit"
                            name="signup"
                            type="submit"
                            value="sign up"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
