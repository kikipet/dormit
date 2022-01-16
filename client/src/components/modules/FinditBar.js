import React, { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import TagDropdown from "./TagDropdown";
import "./FinditBar.css";

function FinditBar(props) {
    // page navigation
    const [pageInput, setPageInput] = useState("");
    function handlePageChange(event) {
        props.updatePage(pageInput);
        event.preventDefault();
    }

    // search fields
    const [searchText, setSearchText] = useState("");

    const tagOptions = ["advertisement", "club", "course", "event", "job", "survey", "other"];
    let tagStatus = {
        club: true,
        course: true,
        event: true,
        job: true,
        advertisement: true,
        survey: true,
        other: true,
    };
    function toggleTag(tag) {
        tagStatus[tag] = !tagStatus[tag];
        console.log(tagStatus);
    }

    function createTagList(tagBooleans) {
        let searchTags = [];
        for (var t in tagOptions) {
            if (tagBooleans[tagOptions[t]]) {
                searchTags.push(tagOptions[t]);
            }
        }
        return searchTags;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    if (props.simple) {
        return (
            <div className="finditbar">
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
                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    updateSearchSimple={props.updateSearchSimple}
                    simple={true}
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
    // TagDropdown remains "dropdown" because I'll need to make this mobile-friendly at some point
    return (
        <div className="finditbar">
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
            <form onSubmit={handleSubmit}>
                <SearchBar searchText={searchText} setSearchText={setSearchText} simple={false} />
                <TagDropdown tagStatus={tagStatus} tagOptions={tagOptions} toggleTag={toggleTag} />
            </form>
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
