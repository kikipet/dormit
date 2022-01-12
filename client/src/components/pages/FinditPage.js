import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { get } from "../../utilities";

import FinditBar from "../modules/FinditBar";
import Dormspam from "../modules/Dormspam";
import PageControl from "../modules/PageControl";

import "./FinditPage.css";

function FinditPage(props) {
    // pagination control
    const [totalPages, setTotalPages] = useState(0);
    let defaultPage = useParams()["pnum"];
    if (typeof defaultPage !== typeof 3) {
        defaultPage = 1;
    }
    const [pageNum, setPageNum] = useState(defaultPage);

    // search bar business
    const [searchText, setSearchText] = useState("");

    // tag control
    const tagOptions = ["club", "course", "event", "job", "advertisement", "survey", "other"];
    let tagStatus = {
        club: false,
        course: false,
        event: false,
        job: false,
        advertisement: false,
        survey: false,
        other: false,
    };
    // search - tag
    function searchTag(tag) {
        for (var t in tagOptions) {
            tagStatus[tagOptions[t]] = tag === tagOptions[t];
        }
        let searchTags = [];
        for (var t in tagOptions) {
            if (tagStatus[tagOptions[t]]) {
                searchTags.push(tagOptions[t]);
            }
        }
        if (searchTags.length > 0) {
            // update page counts
            setPageNum(1);
            get("/api/dormspam-search-tag-count", { tags: searchTags }).then((res) => {
                console.log(res.count);
                setTotalPages(Math.ceil(res.count / 24));
            });
            // get dormspams
            get("/api/dormspam-search-tag", { tags: searchTags, skip: 0 }).then((dormspamObjs) => {
                setDormspams(dormspamObjs);
            });
        }
    }

    // get initial page count
    if (searchText !== "") {
        get("/api/dormspam-search-count", { query: searchText }).then((res) => {
            setTotalPages(Math.ceil(res.count / 24));
        });
    } else {
        get("/api/dormspam-count").then((res) => {
            setTotalPages(Math.ceil(res.count / 24));
        });
    }

    // search - general
    useEffect(() => {
        if (searchText !== "") {
            // update page counts
            setPageNum(1);
            get("/api/dormspam-search-count", { query: searchText }).then((res) => {
                setTotalPages(Math.ceil(res.count / 24));
            });
            // get dormspams
            get("/api/dormspam-search", { query: searchText, skip: 0 }).then((dormspamObjs) => {
                setDormspams(dormspamObjs);
            });
        }
    }, [searchText]);

    // get dormspams
    const [dormspams, setDormspams] = useState([]);
    useEffect(() => {
        if (searchText !== "") {
            get("/api/dormspam-search", { query: searchText, skip: (pageNum - 1) * 24 }).then(
                (dormspamObjs) => {
                    setDormspams(dormspamObjs);
                }
            );
        } else {
            get("/api/dormspams", { skip: (pageNum - 1) * 24 }).then((dormspamObjs) => {
                setDormspams(dormspamObjs);
            });
        }
    }, [pageNum]);

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
                updateTags={searchTag}
            />
        ));
    } else {
        dormspamsList = <div style={{ color: "#fff" }}>loading...</div>;
    }

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
