import React from "react";
import SearchBar from "./SearchBar";
import "./FinditBar.css";

function FinditBar(props) {
    return (
        <div className="finditbar">
            <SearchBar updateSearch={props.updateSearch} />
        </div>
    );
}

export default FinditBar;
