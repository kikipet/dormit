import React from "react";
import { Link } from "react-router-dom";

function AboutPage(props) {
    return (
        <div id="about" className="page-container">
            <Link to="/about" id="profile-title" className="page-title">
                about
            </Link>
            <div className="page-body">
                <p>created in weblab 2022</p>
            </div>
        </div>
    );
}

export default AboutPage;
