import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../../utilities";

function ProfilePage(props) {
    const [draftsDiv, setDraftsDiv] = useState(<div className="profile-drafts"></div>);

    useEffect(() => {
        get("/api/getdrafts").then((res) => {
            let ids = [];
            for (var i in res) {
                ids.push(i);
            }
            setDraftsDiv(
                <div className="profile-drafts">
                    {ids.map((key) => (
                        <Link key={key} className="profile-draft" to={`/sendit/draft/${key}`}>
                            draft {key}
                        </Link>
                    ))}
                </div>
            );
        });
    });

    return (
        <div id="profile" className="page-container">
            <Link to={`/profile/${props.userId}`} id="profile-title" className="page-title">
                profile
            </Link>
            <div className="page-body">
                <h2>Hi, {props.userName}!</h2>
                <h3>Drafts</h3>
                {draftsDiv}
            </div>
        </div>
    );
}

export default ProfilePage;
