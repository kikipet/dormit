import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../utilities.css";
import "./App.css";

import NavbarSelect from "./modules/NavbarSelect";
import Footer from "./modules/Footer";
import LandingPage from "./pages/LandingPage";
import FinditPage from "./pages/FinditPage";
import DormspamFocusPage from "./pages/DormspamFocusPage";
import SenditPage from "./pages/SenditPage";
import SignupLoginPage from "./pages/SignupLoginPage";
import ProfilePage from "./pages/ProfilePage";

import { get, post, isEmpty } from "../utilities";

function App() {
    // where is this stuff supposed to go?
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        get("/api/whoami").then((user) => {
            if (user._id) {
                setUserId(user._id);
            }
        });
    });

    function handleLogin(email, inputPass) {
        return get("/api/userbyemail", { email: email }).then((user) => {
            // no user found
            if (isEmpty(user)) {
                return 1;
            }
            return post("/api/login", { email: email, password: inputPass }).then((res) => {
                // incorrect login
                if (isEmpty(res)) {
                    return 2;
                }
                // successful login
                setUserId(res._id);
                console.log("Logged in!");
                return res._id;
            });
        });
    }

    function handleLogout() {
        console.log("Logged out successfully!");
        setUserId(null);
        post("/api/logout");
    }

    return (
        <div className="root-page-container">
            <Router>
                <NavbarSelect userId={userId} handleLogout={handleLogout} />
                <Routes>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route
                        path="/login"
                        element={<SignupLoginPage type="login" handleLogin={handleLogin} />}
                    />
                    <Route path="/signup" element={<SignupLoginPage type="signup" />} />
                    <Route path="/sendit" element={<SenditPage />} />
                    <Route path="/findit/dormspam/:id" element={<DormspamFocusPage />} />
                    <Route path="/findit#:pnum" element={<FinditPage />} />
                    <Route path="/findit" element={<FinditPage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                    <Route path="/" element={<LandingPage />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
