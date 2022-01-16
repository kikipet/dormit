import React, { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import Tag from "./Tag";
import "./FinditBar.css";

function FinditBar(props) {
    const [pageInput, setPageInput] = useState("");
    function handlePageChange(event) {
        props.updatePage(pageInput);
        event.preventDefault();
    }
    // ... this is not what I wanted
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
            <div className="finditbar-section finditbar-tags">
                <Tag text="advertisement" updateTags={props.updateTags} />
                <Tag text="club" updateTags={props.updateTags} />
                <Tag text="course" updateTags={props.updateTags} />
                <Tag text="event" updateTags={props.updateTags} />
                <Tag text="job" updateTags={props.updateTags} />
                <Tag text="survey" updateTags={props.updateTags} />
                <Tag text="other" updateTags={props.updateTags} />
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

export default FinditBar;
