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

    function handleSubmit(event) {
        event.preventDefault();
    }

    if (props.simple) {
        return (
            <div className="finditbar">
                <div className="finditbar-section search-nav">
                    <SearchBar updateSearch={props.updateSearch} simple={true} />
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
            <form onSubmit={handleSubmit}>
                <SearchBar updateSearch={props.updateSearch} simple={false} />
                <TagDropdown
                    tagStatus={props.tagStatus}
                    tagOptions={props.tagOptions}
                    toggleTag={props.toggleTag}
                    updateTags={props.updateTags}
                />
            </form>
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
