import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../utilities.css";
import "./App.css";

import NavbarSelect from "./modules/NavbarSelect";
import Footer from "./modules/Footer";
import LandingPage from "./pages/LandingPage";
import FinditPage from "./pages/FinditPage";
import SenditPage from "./pages/SenditPage";
import SenditSuccessPage from "./pages/SenditSuccessPage";
import SignupLoginPage from "./pages/SignupLoginPage";
import SignupSuccessPage from "./pages/SignupSuccessPage";
import ConfirmSuccessPage from "./pages/ConfirmSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import DraftsPage from "./pages/DraftsPage";
import AboutPage from "./pages/AboutPage";
import LogoutPage from "./pages/LogoutPage";
import NotFound from "./pages/NotFound";

import { get, post, isEmpty } from "../utilities";

function App() {
    // where is this stuff supposed to go?
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [userStars, setUserStars] = useState([]);

    useEffect(() => {
        get("/api/whoami").then((user) => {
            if (user._id) {
                setUserId(user._id);
                setUserName(user.name);
                setUserConfirmed(user.confirmed);
                setUserStars(user.stars);
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
                setUserName(res.name);
                setUserConfirmed(res.confirmed);
                setUserStars(res.stars);
                return res._id;
            });
        });
    }

    function handleLogout() {
        setUserName("");
        setUserConfirmed(false);
        setUserId(null);
        setUserStars([]);
        post("/api/logout").then((res) => window.location.reload());
    }

    return (
        <div className="root-page-container">
            <Router>
                <NavbarSelect userId={userId} handleLogout={handleLogout} />
                <Routes>
                    <Route
                        path="/profile"
                        element={<ProfilePage userId={userId} userName={userName} />}
                    />
                    <Route
                        path="/login/redirect=:page"
                        element={<SignupLoginPage type="login" handleLogin={handleLogin} />}
                    />
                    <Route
                        path="/login"
                        element={<SignupLoginPage type="login" handleLogin={handleLogin} />}
                    />
                    <Route path="/signup/success" element={<SignupSuccessPage />} />
                    <Route path="/signup" element={<SignupLoginPage type="signup" />} />
                    <Route path="/confirm/:confirmtoken" element={<ConfirmSuccessPage />} />
                    <Route path="/confirm" element={<ConfirmSuccessPage />} />
                    <Route path="/sendit/success" element={<SenditSuccessPage />} />
                    <Route
                        path="/sendit/draft/:key"
                        element={
                            <SenditPage
                                userId={userId}
                                userName={userName}
                                draft={true}
                                confirmed={userConfirmed}
                            />
                        }
                    />
                    <Route
                        path="/sendit"
                        element={
                            <SenditPage
                                userId={userId}
                                userName={userName}
                                draft={false}
                                confirmed={userConfirmed}
                            />
                        }
                    />
                    <Route
                        path="/findit/dormspam/:id"
                        element={<FinditPage focusMode={true} userId={userId} stars={userStars} />}
                    />
                    <Route
                        path="/findit/search/:pagenum"
                        element={<FinditPage focusMode={false} userId={userId} stars={userStars} />}
                    />
                    <Route
                        path="/findit/search"
                        element={<FinditPage focusMode={false} userId={userId} stars={userStars} />}
                    />
                    <Route
                        path="/findit/:pagenum"
                        element={<FinditPage focusMode={false} userId={userId} stars={userStars} />}
                    />
                    <Route
                        path="/findit"
                        element={<FinditPage focusMode={false} userId={userId} stars={userStars} />}
                    />
                    <Route path="/drafts" element={<DraftsPage userId={userId} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/" element={<LandingPage userId={userId} />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
