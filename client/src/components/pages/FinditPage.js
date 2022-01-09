import React, { useState, useEffect, Component } from "react";
import { get } from "../../utilities";

import FinditBar from "../modules/FinditBar";
import Dormspam from "../modules/Dormspam";

import "./FinditPage.css";

function FinditPage(props) {
    const [dormspams, setDormspams] = useState([]);
    const [seen, setSeen] = useState(0); // how many dormspams to skip when pulling dormspams

    useEffect(() => {
        get("/api/dormspams", { skip: 0 }).then((dormspamObjs) => {
            setDormspams(dormspamObjs);
        });
    }, []);

    // // this gets called when the user pushes "Submit", so their
    // // post gets added to the screen right away
    // const addNewStory = (storyObj) => {
    //     setStories([storyObj].concat(stories));
    // };

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
        dormspamsList = <div style={{ color: "#fff" }}>no dormspams!</div>;
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
            </div>
        </div>
    );
}

export default FinditPage;
