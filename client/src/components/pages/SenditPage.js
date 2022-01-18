import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import SenditForm from "../modules/SenditForm";

function SenditPage(props) {
    const [draftNum, setDraftNum] = useState(props.draft ? useParams()["key"] : -1);
    if (props.userId === null && props.draft) {
        return (
            <div id="sendit" className="page-container">
                <Link to="/sendit" id="sendit-title" className="page-title">
                    sendit
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
        <div id="sendit" className="page-container">
            <Link to="/sendit" id="sendit-title" className="page-title">
                sendit
            </Link>
            <SenditForm
                userId={props.userId}
                userName={props.userName}
                draft={props.draft}
                draftNum={draftNum}
            />
        </div>
    );
}

export default SenditPage;
