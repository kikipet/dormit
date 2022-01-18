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
        });
    });

    return (
        <div id="drafts" className="page-container">
            <Link to={`/profile/${props.userId}`} id="drafts-title" className="page-title">
                drafts
            </Link>
            <div className="page-body">{draftsDiv}</div>
        </div>
    );
}

export default DraftsPage;
