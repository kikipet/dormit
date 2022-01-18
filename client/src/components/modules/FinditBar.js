import React, { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import TagDropdown from "./TagDropdown";
import "./FinditBar.css";

function FinditBar(props) {
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
        for (var tag of tagOptions) {
            if (tagBooleans[tag]) {
                searchTags.push(tag);
            }
        }
        return searchTags;
    }

    const [searchTimeStart, setTimeStart] = useState("");
    const [searchTimeEnd, setTimeEnd] = useState("");

    const [searchBC, setBCTalk] = useState("");

    // handle submit
    function handleSubmit(event) {
        if (searchTimeStart !== "" && searchTimeEnd !== "" && searchTimeStart > searchTimeEnd) {
            console.log("Bad date range");
        } else {
            // send stuff over to finditpage to set states
            const tagList = createTagList(tagStatus);
            props.updateSearchAdvanced(
                searchText,
                tagList,
                searchTimeStart,
                searchTimeEnd,
                searchBC
            );
            // reset variables within here as well
            resetAll();
        }
        event.preventDefault();
    }

    function clearSearch() {
        props.clearSearch();
        resetAll();
    }

    function resetAll() {
        setSearchText("");
        setTimeStart("");
        setTimeEnd("");
        setBCTalk("");
        for (var tag of tagOptions) {
            tagStatus[tag] = true;
        }
    }
    if (props.simple) {
        return (
            <div className="finditbar finditbar-simple">
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
                    reset all
                </Link>
            </div>
        );
    }
    if (window.innerWidth <= 600) {
        return (
            <form className="finditbar finditbar-advanced" onSubmit={handleSubmit}>
                <SearchBar searchText={searchText} setSearchText={setSearchText} simple={false} />
                <div className="finditbar-row">
                    <div className="finditbar-date">
                        from
                        <input
                            type="date"
                            className="form-input finditbar-date"
                            name="start"
                            value={searchTimeStart}
                            onChange={(e) => setTimeStart(e.target.value)}
                        ></input>
                    </div>
                    <div className="finditbar-date">
                        to
                        <input
                            type="date"
                            className="form-input finditbar-date"
                            name="end"
                            value={searchTimeEnd}
                            onChange={(e) => setTimeEnd(e.target.value)}
                        ></input>
                    </div>
                </div>
                <TagDropdown
                    useDropdown={false}
                    tagStatus={tagStatus}
                    tagOptions={tagOptions}
                    toggleTag={toggleTag}
                />
                <div className="finditbar-row">
                    <input
                        type="text"
                        className="form-input finditbar-bctalk"
                        name="bctalk"
                        value={searchBC}
                        onChange={(e) => setBCTalk(e.target.value)}
                        placeholder="bc-talk color"
                    ></input>
                    <Link
                        className="action-button finditbar-clear"
                        to="/findit"
                        onClick={clearSearch}
                    >
                        reset all
                    </Link>
                </div>
            </form>
        );
    }
    return (
        <form className="finditbar finditbar-advanced" onSubmit={handleSubmit}>
            <div className="finditbar-date">
                from{" "}
                <input
                    type="date"
                    className="form-input finditbar-date"
                    name="start"
                    value={searchTimeStart}
                    onChange={(e) => setTimeStart(e.target.value)}
                ></input>
            </div>
            <SearchBar searchText={searchText} setSearchText={setSearchText} simple={false} />
            <Link className="action-button finditbar-clear" to="/findit" onClick={clearSearch}>
                reset all
            </Link>
            <div className="finditbar-date">
                to{" "}
                <input
                    type="date"
                    className="form-input finditbar-date"
                    name="end"
                    value={searchTimeEnd}
                    onChange={(e) => setTimeEnd(e.target.value)}
                ></input>
            </div>
            <TagDropdown
                useDropdown={false}
                tagStatus={tagStatus}
                tagOptions={tagOptions}
                toggleTag={toggleTag}
            />
            <input
                type="text"
                className="form-input finditbar-bctalk"
                name="bctalk"
                value={searchBC}
                onChange={(e) => setBCTalk(e.target.value)}
                placeholder="bc-talk color"
            ></input>
        </form>
    );
}

export default FinditBar;
