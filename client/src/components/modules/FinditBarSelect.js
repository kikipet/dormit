import React, { useState } from "react";

import FinditBar from "./FinditBar";

function FinditBarSelect(props) {
    const [simple, setMode] = useState(true);
    return (
        <div className="finditbar-select">
            <div className="finditbar-tabs">
                <button
                    className={`finditbar-tab ${simple ? "finditbar-tab-active" : ""}`}
                    onClick={(e) => setMode(true)}
                >
                    simple search
                </button>
                <button
                    className={`finditbar-tab ${!simple ? "finditbar-tab-active" : ""}`}
                    onClick={(e) => setMode(false)}
                >
                    advanced search
                </button>
            </div>
            <FinditBar
                simple={simple}
                updateSearchSimple={props.updateSearchSimple}
                updateSearchAdvanced={props.updateSearchAdvanced}
                clearSearch={props.clearSearch}
            />
        </div>
    );
}

export default FinditBarSelect;
