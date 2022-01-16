import React, { useState } from "react";

import FinditBar from "./FinditBar";

function FinditBarSelect(props) {
    const [simple, setMode] = useState(true);
    return (
        <div className="finditbar-select">
            <div className="finditbar-tabs">
                <button className="finditbar-tab finditbar-simple" onClick={(e) => setMode(true)}>
                    simple
                </button>
                <button className="finditbar-tab finditbar-simple" onClick={(e) => setMode(false)}>
                    advanced
                </button>
            </div>
            <FinditBar
                simple={simple}
                updateSearch={props.updateSearch}
                clearSearch={props.clearSearch}
                updatePage={props.updatePage}
                tagOptions={props.tagOptions}
                tagStatus={props.tagStatus}
                toggleTag={props.toggleTag}
                updateTags={props.updateTags}
            />
        </div>
    );
}

export default FinditBarSelect;
