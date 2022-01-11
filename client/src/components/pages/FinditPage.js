import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { get } from "../../utilities";

import FinditBar from "../modules/FinditBar";
import Dormspam from "../modules/Dormspam";
import PageControl from "../modules/PageControl";

import "./FinditPage.css";

function FinditPage(props) {
    const [dormspams, setDormspams] = useState([]);
    let defaultPage = useParams()["pnum"];
    if (typeof defaultPage !== typeof 3) {
        defaultPage = 1;
    }
    const [pageNum, setPageNum] = useState(defaultPage);
    let numDormspams = 100;
    // get("/api/dormspam-count").then((count) => {
    //     numDormspams = count;
    // });
    const totalPages = Math.ceil(numDormspams / 24);

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
                <div className="finditbar-container">
                    <FinditBar />
                </div>
                <PageControl pageNum={pageNum} totalPages={totalPages} pageUpdate={pageControl} />
                <div className="dormspams-container">{dormspamsList}</div>
                <PageControl pageNum={pageNum} totalPages={totalPages} pageUpdate={pageControl} />
            </div>
        </div>
    );
}

export default FinditPage;
