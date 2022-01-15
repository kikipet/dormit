import React, { useEffect } from "react";
import { get } from "../../utilities";

function ProfilePage(props) {
    return (
        <div id="profile" className="page-container">
            <h1 id="profile-title" className="page-title">
                profile
            </h1>
            <div className="page-body">
                <h2>Hi, {props.userName}!</h2>
            </div>
        </div>
    );
}

export default ProfilePage;
