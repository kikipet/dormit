import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../../utilities";

import "./DraftsPage.css";

function DraftsPage(props) {
    const [draftsDiv, setDraftsDiv] = useState(<div className="drafts-container"></div>);

    useEffect(() => {
        get("/api/getdrafts").then((res) => {
            let ids = [];
            for (var i in res) {
                ids.push(i);
            }
            if (ids.length === 0) {
                setDraftsDiv(
                    <div className="drafts-container">
                        no drafts yet!
                        <div className="button-container">
                            <button className="action-button draft-action">create dormspam</button>
                        </div>
                    </div>
                );
            } else {
                setDraftsDiv(
                    <div className="drafts-container">
                        {ids.map((key) => (
                            <Link key={key} className="draft-link" to={`/sendit/draft/${key}`}>
                                draft {key}:{" "}
                                {res[key].subject === "" ? "[no subject]" : res[key].subject}
                            </Link>
                        ))}
                    </div>
                );
            }
        });
    });

    if (props.userId === null) {
        return (
            <div id="drafts" className="page-container">
                <Link to="/drafts" id="drafts-title" className="page-title">
                    drafts
                </Link>
                <div className="page-body">
                    <p>
                        You are not logged in.
                        <div className="button-container">
                            <Link className="action-button draft-action" to="/login">
                                log in
                            </Link>
                        </div>
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div id="drafts" className="page-container">
            <Link to="/drafts" id="drafts-title" className="page-title">
                drafts
            </Link>
            <div className="page-body">{draftsDiv}</div>
        </div>
    );
}

export default DraftsPage;
