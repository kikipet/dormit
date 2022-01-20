import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import SenditForm from "../modules/SenditForm";
import "./SenditPage.css";

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
                        <Link to="/login" className="sendit-login-link">
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
