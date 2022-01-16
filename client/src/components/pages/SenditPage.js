import React from "react";
import { Link } from "react-router-dom";

import SenditForm from "../modules/SenditForm";

function SenditPage(props) {
    return (
        <div id="sendit" className="page-container">
            <Link to="/sendit" id="findit-title" className="page-title">
                sendit
            </Link>
            <SenditForm userName={props.userName} />
        </div>
    );
}

export default SenditPage;
