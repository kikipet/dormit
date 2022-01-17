import React, { useState } from "react";
import SearchTag from "./SearchTag";

function TagDropdown(props) {
    const [full, setMode] = useState(!props.useDropdown);

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
        if (props.useDropdown) {
            return (
                <div className="finditbar-section finditbar-tags-expand">
                    <button
                        className="action-button finditbar-tag-button"
                        type="button"
                        onClick={toggleMode}
                    >
                        hide tags
                    </button>
                    <div className="finditbar-tags">{tagCollection}</div>
                </div>
            );
        }
        return <div className="finditbar-section finditbar-tags">{tagCollection}</div>;
    }
    return (
        <div className="finditbar-section finditbar-tags">
            <button
                className="action-button finditbar-tag-button"
                type="button"
                onClick={toggleMode}
            >
                choose tags
            </button>
        </div>
    );
}

export default TagDropdown;
