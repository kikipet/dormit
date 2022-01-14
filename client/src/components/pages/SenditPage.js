import React from "react";

import SenditForm from "../modules/SenditForm";

function SenditPage(props) {
    return (
        <div id="sendit" className="page-container">
            <h1 id="findit-title" className="page-title">
                sendit
            </h1>
            <SenditForm userName={props.userName} />
        </div>
    );
}

export default SenditPage;
