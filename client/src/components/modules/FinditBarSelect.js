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
                updateSearchSimple={props.updateSearchSimple}
                updateSearchAdvanced={props.updateSearchAdvanced}
                clearSearch={props.clearSearch}
                updatePage={props.updatePage}
            />
        </div>
    );
}

export default FinditBarSelect;
