import React, { useState, useEffect } from "react";
import { IoCaretBack, IoCaretDown, IoCaretForward, IoCaretUp } from "react-icons/io5";
import { useParams } from "react-router-dom";

import { get } from "../../utilities";

import FinditBar from "../modules/FinditBar";
import Dormspam from "../modules/Dormspam";

import "./FinditPage.css";

function FinditPage(props) {
    const [dormspams, setDormspams] = useState([]);
    var defaultPage = useParams()["pnum"];
    if (typeof defaultPage !== typeof 3) {
        defaultPage = 1;
    }
    const [pageNum, setPageNum] = useState(defaultPage);

    useEffect(() => {
        get("/api/dormspams", { skip: (pageNum - 1) * 24 }).then((dormspamObjs) => {
            setDormspams(dormspamObjs);
        });
    }, [pageNum]);

    function pageControl(newPageNum) {
        setPageNum(newPageNum);
    }

    let dormspamsList = null;
    const hasDormspams = dormspams.length !== 0;
    if (hasDormspams) {
        dormspamsList = dormspams.map((dormspamObj) => (
            <Dormspam
                id={dormspamObj._id}
                date={Date.parse(dormspamObj.date)}
                title={dormspamObj.title}
                author={dormspamObj.author}
                body={dormspamObj.body}
                bctalk={dormspamObj.bctalk}
                tag={dormspamObj.tag}
                focused={false}
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
                <div class="finditbar-container">
                    <FinditBar />
                </div>
                <div className="dormspams-container">{dormspamsList}</div>
                <div className="findit-page-controls">
                    <button
                        className={`findit-page-arrow-${pageNum == 1 ? "disabled" : ""}`}
                        name="previousPage"
                        onClick={(e) => pageControl(pageNum - 1)}
                    >
                        <IoCaretBack />
                    </button>
                    <button
                        className="findit-page-arrow"
                        name="nextPage"
                        onClick={(e) => pageControl(pageNum + 1)}
                    >
                        <IoCaretForward />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FinditPage;
