import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../../utilities";

function ProfilePage(props) {
    return (
        <div id="profile" className="page-container">
            <Link to={`/profile/${props.userId}`} id="profile-title" className="page-title">
                profile
            </Link>
            <div className="page-body">
                <h2>Hi, {props.userName}!</h2>
            </div>
        </div>
    );
}

export default ProfilePage;
