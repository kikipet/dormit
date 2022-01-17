import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

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
    const [tagStatus, setTagStatus] = useState({
        advertisement: true,
        club: true,
        course: true,
        event: true,
        job: true,
        survey: true,
        other: true,
    });
    function toggleTag(tag) {
        let newTagStatus = { ...tagStatus };
        newTagStatus[tag] = !tagStatus[tag];
        setTagStatus(newTagStatus);
    }
    function createTagList(tagBooleans) {
        // to send to FinditPage's function(s)
        let searchTags = [];
        for (var t in tagOptions) {
            if (tagBooleans[tagOptions[t]]) {
                searchTags.push(tagOptions[t]);
            }
        }
        return searchTags;
    }

    const [searchTimeStart, setTimeStart] = useState("");
    const [searchTimeEnd, setTimeEnd] = useState("");

    const [searchBC, setBCTalk] = useState("");

    function handleSubmit(event) {
        // send stuff over to finditpage to set states
        const tagList = createTagList(tagStatus);
        props.updateSearchAdvanced(searchText, tagList, searchTimeStart, searchTimeEnd, searchBC);
        // reset variables within here as well
        setSearchText("");
        setTimeStart("");
        setTimeEnd("");
        setBCTalk("");
        for (var t in tagOptions) {
            tagStatus[tagOptions[t]] = true;
        }
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
            <form onSubmit={handleSubmit}>
                <SearchBar searchText={searchText} setSearchText={setSearchText} simple={false} />
                <div className="finditbar-dates">
                    <input
                        type="date"
                        className="form-input finditbar-date"
                        name="start"
                        value={searchTimeStart}
                        onChange={(e) => setTimeStart(e.target.value)}
                    ></input>
                    {" - "}
                    <input
                        type="date"
                        className="form-input finditbar-date"
                        name="end"
                        value={searchTimeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
                    ></input>
                </div>
                <TagDropdown tagStatus={tagStatus} tagOptions={tagOptions} toggleTag={toggleTag} />
                <input
                    type="text"
                    className="form-input"
                    name="bctalk"
                    value={searchBC}
                    onChange={(e) => setBCTalk(e.target.value)}
                    placeholder="bc-talk color"
                ></input>
                <button className="action-button" type="submit">
                    search
                </button>
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
