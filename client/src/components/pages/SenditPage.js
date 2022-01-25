import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import SenditForm from "../modules/SenditForm";
import SenditFormDraft from "../modules/SenditFormDraft";

function SenditPage(props) {
    const [draftNum, setDraftNum] = useState(props.draft ? useParams()["key"] : -1);
    if (props.userId === null) {
        return (
            <div id="sendit" className="page-container">
                <Link to="/sendit" id="sendit-title" className="page-title">
                    sendit
                </Link>
                <div className="page-body">
                    <p>
                        You are not logged in.{" "}
                        <Link to="/login/redirect=sendit" className="login-redirect-link">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        );
    } else if (!props.confirmed) {
        return (
            <div id="sendit" className="page-container">
                <Link to="/sendit" id="sendit-title" className="page-title">
                    sendit
                </Link>
                <div className="page-body">
                    <p>Your account is not confirmed. Check your inbox for a confirmation email.</p>
                </div>
            </div>
        );
    } else if (props.draft) {
        return (
            <div id="sendit" className="page-container">
                <Link to="/sendit" id="sendit-title" className="page-title">
                    sendit
                </Link>
                <SenditFormDraft
                    userId={props.userId}
                    userName={props.userName}
                    draftNum={draftNum}
                />
            </div>
        );
    }
    return (
        <div id="sendit" className="page-container">
            <Link to="/sendit" id="sendit-title" className="page-title">
                sendit
            </Link>
            <SenditForm userId={props.userId} userName={props.userName} />
        </div>
    );
}

export default SenditPage;
