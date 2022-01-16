import React, { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import TagDropdown from "./TagDropdown";
import "./FinditBar.css";

function FinditBar(props) {
    const [pageInput, setPageInput] = useState("");
    function handlePageChange(event) {
        props.updatePage(pageInput);
        event.preventDefault();
    }
    if (props.simple) {
        return (
            <div className="finditbar">
                <div className="finditbar-section search-nav">
                    <SearchBar updateSearch={props.updateSearch} />
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
                <Link
                    className="action-button finditbar-clear"
                    to="/findit"
                    onClick={props.clearSearch}
                >
                    clear search
                </Link>
            </div>
        );
    }
    return (
        <div className="finditbar">
            <div className="finditbar-section search-nav">
                <SearchBar updateSearch={props.updateSearch} />
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
            <TagDropdown
                tagStatus={props.tagStatus}
                tagOptions={props.tagOptions}
                toggleTag={props.toggleTag}
                updateTags={props.updateTags}
            />
            <Link
                className="action-button finditbar-clear"
                to="/findit"
                onClick={props.clearSearch}
            >
                clear search
            </Link>
        </div>
    );
}

export default FinditBar;
