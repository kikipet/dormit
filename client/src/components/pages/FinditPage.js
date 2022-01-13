import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { get } from "../../utilities";

import FinditBar from "../modules/FinditBar";
import Dormspam from "../modules/Dormspam";
import DormspamFocusPage from "./DormspamFocusPage";
import PageControl from "../modules/PageControl";

import "./FinditPage.css";

function FinditPage(props) {
    const [focusMode, setFocusMode] = useState(props.focusMode);

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

    // tag control
    const tagOptions = ["club", "course", "event", "job", "advertisement", "survey", "other"];
    const [searchTagList, setTagList] = useState([]);
    let tagStatus = {
        club: false,
        course: false,
        event: false,
        job: false,
        advertisement: false,
        survey: false,
        other: false,
    };
    function createTagList() {
        let searchTags = [];
        for (var t in tagOptions) {
            if (tagStatus[tagOptions[t]]) {
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

    // search - tags
    function searchByTag(tag) {
        setFocusMode(false);
        for (var t in tagOptions) {
            tagStatus[tagOptions[t]] = tag === tagOptions[t];
        }
        const searchTags = createTagList();
        setTagList(searchTags);
    }
    useEffect(() => {
        if (searchTagList.length > 0) {
            // update page counts
            setPageNum(1);
            updateTotPageCount("/api/dormspam-search-tag-count", { tags: searchTagList });
            // get dormspams
            get("/api/dormspam-search-tag", { tags: searchTagList, skip: 0 }).then(
                (dormspamObjs) => {
                    setDormspams(dormspamObjs);
                }
            );
        }
    }, [searchTagList]);

    // search - text
    useEffect(() => {
        if (searchText !== "") {
            setPageNum(1);
            updateTotPageCount("/api/dormspam-search-count", { query: searchText });
            getDormspams("/api/dormspam-search", { query: searchText, skip: 0 });
        }
    }, [searchText]);

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
            />
        ));
    } else {
        dormspamsList = <div style={{ color: "#fff" }}>loading...</div>;
    }

    // return web content

    // focus mode - 1 dormspam
    if (focusMode) {
        const dormspamID = useParams()["id"];
        return (
            <DormspamFocusPage
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
            <h1 id="findit-title" className="page-title">
                findit
            </h1>
            <div className="findit-container">
                <div className="finditbar-container">
                    <FinditBar updateSearch={setSearchText} />
                </div>
                <PageControl pageNum={pageNum} totalPages={totalPages} pageUpdate={setPageNum} />
                <div className="dormspams-container">{dormspamsList}</div>
                <PageControl pageNum={pageNum} totalPages={totalPages} pageUpdate={setPageNum} />
            </div>
        </div>
    );
}

export default FinditPage;
