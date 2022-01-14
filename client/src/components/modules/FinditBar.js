import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import "./FinditBar.css";

function FinditBar(props) {
    return (
        <div className="finditbar">
            <SearchBar updateSearch={props.updateSearch} />
            <Link to="/findit" onClick={props.clearSearch}>
                clear search
            </Link>
        </div>
    );
}

export default FinditBar;
