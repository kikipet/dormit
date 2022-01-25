import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoStar } from "react-icons/io5";

import { get, isEmpty } from "../../utilities";

import FinditBarSelect from "../modules/FinditBarSelect";
import Dormspam from "../modules/Dormspam";
import DormspamFocus from "../modules/DormspamFocus";
import PageControl from "../modules/PageControl";

import "./FinditPage.css";

function FinditPage(props) {
    // focus mode (one dormspam) or browsing mode (all dormspams)
    const [focusMode, setFocusMode] = useState(
        props.focusMode || window.location.pathname.indexOf("dormspam") !== -1
    );
    const navigate = useNavigate();

    // is the current page focused? what's the current page number? a jank (but effective??) fix
    useEffect(() => {
        var isDormspam = window.location.pathname.indexOf("dormspam") !== -1;
        setFocusMode(isDormspam);
        if (!isDormspam) {
            var split = window.location.pathname.split("/");
            var last = split[split.length - 1];
            if (!isNaN(last)) {
                setPageNum(parseInt(last));
                setPageInput(parseInt(last));
            } else {
                setPageNum(1);
                setPageInput(1);
            }
        }
    }, [window.location.pathname]);

    // dormspam grabbing
    const [dormspams, setDormspams] = useState([]);
    function getDormspams(call, params = {}) {
        get(call, params).then((dormspamObjs) => {
            if (dormspamObjs.length === 0) {
                setDormspams(["no dormspams"]);
            } else {
                setDormspams(dormspamObjs);
            }
        });
    }

    // pagination control
    const [totalPages, setTotalPages] = useState(0);
    let defaultPage = useParams()["pagenum"];
    if (isNaN(defaultPage)) {
        defaultPage = 1;
    } else {
        defaultPage = parseInt(defaultPage);
    }

    const [pageNum, setPageNum] = useState(defaultPage);
    const [pageInput, setPageInput] = useState(defaultPage);

    function updateTotPageCount(call, params = {}) {
        get(call, params).then((res) => {
            setTotalPages(Math.ceil(res.count / 24));
        });
    }

    // dormspam filtration
    const [star, setStar] = useState(false);
    const [sort, setSort] = useState("date");
    function toggleStar() {
        setStar(!star);
    }

    // search bar business
    const [searchText, setSearchText] = useState("");
    const [searchTagList, setTagList] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    function clearSearchItems() {
        setSearchText("");
        setTagList([]);
        setSearchQuery({});
        setFocusMode(false);
        setPageNum(1);
        setPageInput(1);
        getDormspams("/api/dormspams", { skip: 0 });
    }

    // get initial page count
    if (!isEmpty(searchQuery)) {
        updateTotPageCount("/api/dormspam-search-advanced-count", searchQuery);
    } else if (searchText !== "") {
        updateTotPageCount("/api/dormspam-search-count", { text: searchText });
    } else if (searchTagList.length > 0) {
        updateTotPageCount("/api/dormspam-search-tag-count", { tagList: searchTagList });
    } else {
        updateTotPageCount("/api/dormspam-count");
    }

    // search - single tag (via dormspam)
    function searchByTag(tag) {
        setFocusMode(false);
        const searchTags = [tag];
        setTagList(searchTags);
        // the actual search part
        navigate("/findit/search");
        setPageNum(1);
        setPageInput(1);
        let query = {
            tagList: searchTags,
            text: "",
            timeStart: "",
            timeEnd: "",
            bctalk: "",
            sort: sort,
            star: star,
            stars: stars,
        };
        query.skip = 0;
        updateTotPageCount("/api/dormspam-search-tag-count", query);
        getDormspams("/api/dormspam-search-tag", query);
    }

    // search - text (simple search)
    function searchByText(search) {
        setSearchText(search);

        setFocusMode(false);
        navigate("/findit/search");
        setPageNum(1);
        setPageInput(1);
        let query = {
            text: search,
            tagList: [],
            timeStart: "",
            timeEnd: "",
            bctalk: "",
            sort: sort,
            star: star,
            stars: stars,
        };
        query.skip = 0;
        updateTotPageCount("/api/dormspam-search-count", query);
        getDormspams("/api/dormspam-search", query);
    }

    // search - advanced search
    function searchAdvanced(text, tagList, timeStart, timeEnd, bctalk) {
        setFocusMode(false);
        setTagList(tagList);
        navigate("/findit/search");
        setPageNum(1);
        setPageInput(1);
        let query = {
            text: text,
            tagList: tagList,
            timeStart: timeStart,
            timeEnd: timeEnd,
            bctalk: bctalk,
            sort: sort,
            star: star,
            stars: stars,
        };
        setSearchQuery(query);
        query.skip = 0;
        updateTotPageCount("/api/dormspam-search-advanced-count", query);
        getDormspams("/api/dormspam-search-advanced", query);
    }

    // dormspam stars
    const [stars, setStars] = useState(props.stars);

    // get dormspams
    useEffect(() => {
        if (!focusMode) {
            if (!isEmpty(searchQuery)) {
                navigate(`/findit/search/${pageNum}`, { replace: true });
                let newQuery = { ...searchQuery, star: star, skip: (pageNum - 1) * 24 };
                getDormspams("/api/dormspam-search-advanced", newQuery);
            } else if (searchText !== "") {
                navigate(`/findit/search/${pageNum}`, { replace: true });
                getDormspams("/api/dormspam-search", {
                    text: searchText,
                    skip: (pageNum - 1) * 24,
                    sort: sort,
                    star: star,
                    stars: stars,
                });
            } else if (searchTagList.length !== 0) {
                navigate(`/findit/search/${pageNum}`, { replace: true });
                getDormspams("/api/dormspam-search-tag", {
                    tagList: searchTagList,
                    skip: (pageNum - 1) * 24,
                    sort: sort,
                    star: star,
                    stars: stars,
                });
            } else {
                navigate(`/findit/${pageNum}`, { replace: true });
                getDormspams("/api/dormspams", {
                    skip: (pageNum - 1) * 24,
                    sort: sort,
                    star: star,
                    stars: stars,
                });
            }
        }
    }, [pageNum, star]);

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
        if (dormspams[0] === "no dormspams") {
            dormspamsList = <div style={{ color: "#fff" }}>no results found</div>;
        } else {
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
                    star={stars.includes(dormspamObj._id)}
                    parentStars={stars}
                    parentSetStars={setStars}
                />
            ));
        }
    } else {
        dormspamsList = <div style={{ color: "#fff" }}>loading...</div>;
    }

    // return page content
    let pageContent = (
        <div className="findit-content">
            {window.innerWidth < 540 ? (
                <div className="findit-control-container">
                    <div className="toggle-starred-container">
                        <p>starred only:</p>
                        <input
                            type="checkbox"
                            name="star"
                            value={star}
                            id="toggle"
                            className="toggle-checkbox toggle-star-checkbox"
                        />
                        <label
                            for="toggle"
                            className="toggle-label toggle-label-star"
                            onClick={() => toggleStar()}
                        >
                            <span className="toggle-label-background toggle-star">
                                <IoStar className="star-on" />
                            </span>
                        </label>
                    </div>
                    <PageControl
                        pageNum={pageNum}
                        pageInput={pageInput}
                        totalPages={totalPages}
                        pageUpdate={setPageNum}
                        setPageInput={setPageInput}
                    />
                </div>
            ) : (
                <div className="findit-control-container">
                    <div></div>
                    <PageControl
                        pageNum={pageNum}
                        pageInput={pageInput}
                        totalPages={totalPages}
                        pageUpdate={setPageNum}
                        setPageInput={setPageInput}
                    />
                    <div className="toggle-starred-container">
                        <p>starred only:</p>
                        <input
                            type="checkbox"
                            name="star"
                            value={star}
                            id="toggle"
                            className="toggle-checkbox toggle-star-checkbox"
                        />
                        <label
                            for="toggle"
                            className="toggle-label toggle-label-star"
                            onClick={() => toggleStar()}
                        >
                            <span className="toggle-label-background toggle-star">
                                <IoStar className="star-on" />
                            </span>
                        </label>
                    </div>
                </div>
            )}
            <div className="dormspams-container">{dormspamsList}</div>
            <PageControl
                pageNum={pageNum}
                pageInput={pageInput}
                totalPages={totalPages}
                pageUpdate={setPageNum}
                setPageInput={setPageInput}
            />
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
                star={stars.includes(dormspamID)}
                parentStars={stars}
                parentSetStars={setStars}
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
                        clearSearch={clearSearchItems}
                        updateSearchSimple={searchByText}
                        updateSearchAdvanced={searchAdvanced}
                    />
                </div>
                {pageContent}
            </div>
        </div>
    );
}

export default FinditPage;
