import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import SenditForm from "../modules/SenditForm";

function SenditPage(props) {
    const [draftNum, setDraftNum] = useState(props.draft ? useParams()["key"] : -1);
    return (
        <div id="sendit" className="page-container">
            <Link to="/sendit" id="findit-title" className="page-title">
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
