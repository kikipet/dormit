import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dormspam from "../modules/Dormspam";

import "./DormspamFocusPage.css";
import "./FinditPage.css";
import FinditBar from "../modules/FinditBar";

function DormspamFocusPage(props) {
    const dormspamID = useParams()["id"];
    const [dormspam, setDormspam] = useState("");

    useEffect(() => {
        get("/api/dormspam", { id: dormspamID }).then((dormspamObj) => {
            setDormspam(dormspamObj);
        });
    }, []);

    // console.log(dormspam);

    return (
        <div id="dormspam-focus" className="page-container">
            <h1 id="findit-title" className="page-title">
                findit
            </h1>
            <div className="dormspam-focus-container">
                <div className="finditbar-container">
                    <FinditBar />
                </div>
                <div className="dormspam-single-container">
                    <Dormspam
                        id={dormspam._id}
                        date={Date.parse(dormspam.date)}
                        title={dormspam.title}
                        author={dormspam.author}
                        body={dormspam.body}
                        bctalk={dormspam.bctalk}
                        tag={dormspam.tag}
                        focused={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default DormspamFocusPage;
