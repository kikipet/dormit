import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { validEmail } from "./regex";

function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleEmailChange(value) {
        setEmail(value);
        setEmailErr(!validEmail.test(value) && value !== "");
    }

    function handleSubmit(event) {
        const result = props.handleLogin(email, password);
        result.then((status) => {
            console.log(status);
            if (status === 1) {
                alert("User doesn't exist");
            } else if (status === 2) {
                alert("Incorrect login");
            } else {
                navigate(`/profile/${status}`);
            }
        });
        event.preventDefault();
    }

    return (
        <div className="form-container signup-login-form-container">
            <div className="signup-login-redirect">
                <p>
                    need an account? <Link to="/signup">sign up</Link>
                </p>{" "}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-column">
                    <label className={emailErr ? "form-field-error" : "form-field"}>
                        email
                        <input
                            className="form-input"
                            name="email"
                            type="text"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                        />
                        {emailErr ? "invalid email" : ""}
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
