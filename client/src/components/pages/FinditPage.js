import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { get } from "../../utilities";

import FinditBarSelect from "../modules/FinditBarSelect";
import Dormspam from "../modules/Dormspam";
import DormspamFocus from "../modules/DormspamFocus";
import PageControl from "../modules/PageControl";

import "./FinditPage.css";

function FinditPage(props) {
    const [focusMode, setFocusMode] = useState(props.focusMode);
    const navigate = useNavigate();

    // dormspam grabbing
    const [dormspams, setDormspams] = useState([]);
    function getDormspams(call, params = {}) {
        get(call, params).then((dormspamObjs) => {
            setDormspams(dormspamObjs);
        });
    }

    // pagination control
    const [totalPages, setTotalPages] = useState(0);
    let defaultPage = useParams()["pnum"];
    if (typeof defaultPage !== typeof 3) {
        defaultPage = 1;
    }
    const [pageNum, setPageNum] = useState(defaultPage);
    function updateTotPageCount(call, params = {}) {
        get(call, params).then((res) => {
            setTotalPages(Math.ceil(res.count / 24));
        });
    }

    // search bar business
    const [searchText, setSearchText] = useState("");
    const [searchQuery, setSearchQuery] = useState({ skip: 0 });
    function clearSearchItems() {
        setSearchText("");
        setTagList([]);
        for (var t in tagOptions) {
            tagStatus[tagOptions[t]] = false;
        }
        setFocusMode(false);
        setPageNum(1);
        getDormspams("/api/dormspams", { skip: 0 });
    }

    // tag control
    const tagOptions = ["advertisement", "club", "course", "event", "job", "survey", "other"];
    const [searchTagList, setTagList] = useState([]);
    // these are the tags attached to dormspams
    let tagStatus = {
        club: false,
        course: false,
        event: false,
        job: false,
        advertisement: false,
        survey: false,
        other: false,
    };
    // and these are the tags attached to the (advanced) search bar
    let searchTagStatus = {
        club: true,
        course: true,
        event: true,
        job: true,
        advertisement: true,
        survey: true,
        other: true,
    };
    function toggleSearchTag(tag) {
        searchTagStatus[tag] = !searchTagStatus[tag];
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

    // get initial page count
    if (searchText !== "") {
        updateTotPageCount("/api/dormspam-search-count", { query: searchText });
    } else if (searchTagList.length > 0) {
        updateTotPageCount("/api/dormspam-search-tag-count", { tags: searchTagList });
    } else {
        updateTotPageCount("/api/dormspam-count");
    }

    // search - single tag (via dormspam)
    function searchByTag(tag) {
        setFocusMode(false);
        for (var t in tagOptions) {
            tagStatus[tagOptions[t]] = tag === tagOptions[t];
        }
        const searchTags = createTagList(tagStatus);
        setTagList(searchTags);
        // the actual search part
        navigate("/findit/search", { replace: true });
        setPageNum(1);
        const query = {
            tags: searchTags,
            skip: 0,
        };
        setSearchQuery(query);
        updateTotPageCount("/api/dormspam-search-tag-count", query);
        getDormspams("/api/dormspam-search-tag", query);
    }

    // search - text
    function searchByText(search) {
        setSearchText(search);

        setFocusMode(false);
        navigate("/findit/search", { replace: true });
        setPageNum(1);
        const query = { query: search, skip: 0 };
        setSearchQuery(query);
        updateTotPageCount("/api/dormspam-search-count", query);
        getDormspams("/api/dormspam-search", query);
    }

    // search - advanced search
    function searchAdvanced(tagList) {
        setFocusMode(false);
        const searchTags = createTagList(tagList);
        setTagList(searchTags);
    }

    // get dormspams
    useEffect(() => {
        if (searchText !== "") {
            getDormspams("/api/dormspam-search", { query: searchText, skip: (pageNum - 1) * 24 });
        } else if (searchTagList.length !== 0) {
            getDormspams("/api/dormspam-search-tag", {
                tags: searchTagList,
                skip: (pageNum - 1) * 24,
            });
        } else {
            getDormspams("/api/dormspams", { skip: (pageNum - 1) * 24 });
        }
    }, [pageNum]);

    // dormspam clickability
    function onCardClick(e, id) {
        const isTextSelected = window.getSelection().toString();
        if (!isTextSelected) {
            setFocusMode(true);
            navigate(`/findit/dormspam/${id}`);
        }
    }

    // generate dormspam cards
    let dormspamsList = null;
    const hasDormspams = dormspams.length !== 0;
    if (hasDormspams) {
        dormspamsList = dormspams.map((dormspamObj) => (
            <Dormspam
                key={dormspamObj._id}
                id={dormspamObj._id}
                date={Date.parse(dormspamObj.date)}
                title={dormspamObj.title}
                author={dormspamObj.author}
                body={dormspamObj.body}
                bctalk={dormspamObj.bctalk}
                tag={dormspamObj.tag}
                focused={false}
                updateTags={searchByTag}
                toggleFocusMode={() => {
                    setFocusMode(!focusMode);
                }}
                handleCardClick={onCardClick}
            />
        ));
    } else {
        dormspamsList = <div style={{ color: "#fff" }}>loading...</div>;
    }

    // return web content
    let webContent = (
        <div className="findit-content">
            <PageControl pageNum={pageNum} totalPages={totalPages} pageUpdate={setPageNum} />
            <div className="dormspams-container">{dormspamsList}</div>
            <PageControl pageNum={pageNum} totalPages={totalPages} pageUpdate={setPageNum} />
        </div>
    );
    // focus mode - 1 dormspam
    if (focusMode) {
        const dormspamID = useParams()["id"];
        webContent = (
            <DormspamFocus
                id={dormspamID}
                searchByTag={searchByTag}
                toggleFocusMode={() => {
                    setFocusMode(!focusMode);
                }}
            />
        );
    }
    // browsing mode - many dormspams
    return (
        <div id="findit" className="page-container">
            <Link to="/findit" id="findit-title" className="page-title">
                findit
            </Link>
            <div className="findit-container">
                <div className="finditbar-container">
                    <FinditBarSelect
                        updateSearch={searchByText}
                        clearSearch={clearSearchItems}
                        updatePage={setPageNum}
                        tagOptions={tagOptions}
                        tagStatus={searchTagStatus}
                        toggleTag={toggleSearchTag}
                        updateTags={searchByTag}
                    />
                </div>
                {webContent}
            </div>
        </div>
    );
}

export default FinditPage;
