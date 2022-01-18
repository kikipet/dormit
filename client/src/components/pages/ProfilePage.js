import React from "react";
import { Link } from "react-router-dom";

function ProfilePage(props) {
    if (props.userId === null) {
        return (
            <div id="profile" className="page-container">
                <Link to="/profile" id="profile-title" className="page-title">
                    profile
                </Link>
                <div className="page-body">
                    <p>
                        You are not logged in. <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div id="profile" className="page-container">
            <Link to="/profile" id="profile-title" className="page-title">
                profile
            </Link>
            <div className="page-body">
                <h1>Hi, {props.userName}!</h1>
            </div>
        </div>
    );
}

export default ProfilePage;
