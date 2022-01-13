import React, { useState } from "react";

function Tag(props) {
    return (
        <button
            className="dormspam-tag"
            name={props.text}
            onClick={(e) => props.updateTags(props.text)}
        >
            {props.text}
        </button>
    );
}

export default Tag;
