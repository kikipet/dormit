import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { validEmail } from "./regex";

function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessages, setErrMessages] = useState([]);
    const [errMessageDiv, setErrContent] = useState(<div className="login-error-boxes"></div>);

    const navigate = useNavigate();

    function handleEmailChange(value) {
        setEmail(value);
        setEmailErr(!validEmail.test(value) && value !== "");
    }

    function handleSubmit(event) {
        let newErrList = [];
        if (!validEmail.test(email) || email === "") {
            newErrList.push("invalid email");
        }
        setErrMessages(newErrList);
        if (newErrList.length === 0) {
            const result = props.handleLogin(email, password);
            result.then((status) => {
                console.log(status);
                if (status === 1) {
                    newErrList.push("user doesn't exist");
                } else if (status === 2) {
                    newErrList.push("incorrect login");
                } else {
                    navigate(`/profile/${status}`);
                }
                setErrMessages(newErrList);
            });
        }
        event.preventDefault();
    }

    // render errors
    if (errMessages.length > 0) {
        setErrContent(
            <div className="login-error-boxes">
                {errMessages.map((message) => (
                    <p className="error-box">{message}</p>
                ))}
            </div>
        );
        setErrMessages([]);
    }

    return (
        <div className="form-container signup-login-form-container">
            <div className="signup-login-redirect">
                <p>
                    need an account? <Link to="/signup">sign up</Link>
                </p>
            </div>
            {errMessageDiv}
            <form onSubmit={handleSubmit}>
                <div className="form-column">
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div className="signup-login-action-button">
                        <input
                            className="action-button signup-login-submit"
                            name="login"
                            type="submit"
                            value="log in"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
