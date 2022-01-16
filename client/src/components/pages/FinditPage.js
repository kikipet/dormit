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
    const [searchTagList, setTagList] = useState([]);
    const [searchTimeStart, setTimeStart] = useState("1970-01-01");
    const [searchTimeEnd, setTimeEnd] = useState(Date());
    const [searchBC, setBCTalk] = useState("");
    const [searchQuery, setSearchQuery] = useState({});

    function clearSearchItems() {
        setSearchText("");
        setTagList([]);
        setTimeStart("1970-01-01");
        setTimeEnd(Date());
        setBCTalk("");
        setSearchQuery({});
        setFocusMode(false);
        setPageNum(1);
        getDormspams("/api/dormspams", { skip: 0 });
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
        const searchTags = [tag];
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

    // return page content
    let pageContent = (
        <div className="findit-content">
            <PageControl pageNum={pageNum} totalPages={totalPages} pageUpdate={setPageNum} />
            <div className="dormspams-container">{dormspamsList}</div>
            <PageControl pageNum={pageNum} totalPages={totalPages} pageUpdate={setPageNum} />
        </div>
    );
    // focus mode - 1 dormspam
    if (focusMode) {
        const dormspamID = useParams()["id"];
        pageContent = (
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
                        updatePage={setPageNum}
                        clearSearch={clearSearchItems}
                        updateSearchSimple={searchByText}
                    />
                </div>
                {pageContent}
            </div>
        </div>
    );
}

export default FinditPage;
