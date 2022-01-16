import React, { useState } from "react";
import SearchTag from "./SearchTag";

function TagDropdown(props) {
    const [full, setMode] = useState(true);

    function toggleMode() {
        setMode(!full);
    }

    const tagCollection = props.tagOptions.map((tag) => (
        <SearchTag
            key={tag}
            text={tag}
            tagStatus={props.tagStatus[tag]}
            toggleTag={props.toggleTag}
        />
    ));

    // props.updateTags is the multitag search function

    if (full) {
        return (
            <div className="finditbar-section finditbar-tags">
                {/* <button onClick={toggleMode}>hide tags</button> */}
                {tagCollection}
            </div>
        );
    }
    return (
        <div className="finditbar-section finditbar-tags">
            <button onClick={toggleMode}>search by tag</button>
        </div>
    );
}

export default TagDropdown;
