import React from "react";
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

// redirect from sendit to login if not currently signed in

const App = () => {
    return (
        <div>
            <Router class="root-page-container">
                <NavbarSelect />
                <Routes>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={<SignupLoginPage type="login" />} />
                    <Route path="/signup" element={<SignupLoginPage type="signup" />} />
                    <Route path="/sendit" element={<SenditPage />} />
                    <Route path="/findit/dormspam/:id" element={<DormspamFocusPage />} />
                    <Route path="/findit#:pnum" element={<FinditPage />} />
                    <Route path="/findit" element={<FinditPage />} />
                    <Route path="/" element={<LandingPage />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
