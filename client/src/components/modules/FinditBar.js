import React, { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import "./FinditBar.css";

function FinditBar(props) {
    const [pageInput, setPageInput] = useState("");
    function handlePageChange(event) {
        props.updatePage(pageInput);
        event.preventDefault();
    }
    return (
        <div className="finditbar">
            <SearchBar updateSearch={props.updateSearch} />
            <div className="finditbar-tags">
                {/* <Tag text={props.tag} updateTags={props.updateTags} /> */}
            </div>
            <Link
                className="action-button finditbar-clear"
                to="/findit"
                onClick={props.clearSearch}
            >
                clear search
            </Link>
            <form className="page-input" onSubmit={handlePageChange}>
                go to page:{" "}
                <input
                    className="form-input page-num"
                    name="pageNum"
                    type="text"
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                />
            </form>
        </div>
    );
}

export default FinditBar;
