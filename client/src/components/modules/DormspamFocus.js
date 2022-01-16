import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dormspam from "./Dormspam";
import { get } from "../../utilities";

import "./DormspamFocus.css";

function DormspamFocusPage(props) {
    const [dormspam, setDormspam] = useState({ date: "2022-01-01T00:00:00" });

    useEffect(() => {
        get("/api/dormspam", { id: props.id }).then((dormspamObj) => {
            setDormspam(dormspamObj);
        });
    }, []);

    return (
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
                updateTags={props.searchByTag}
                toggleFocusMode={props.toggleFocusMode}
            />
        </div>
    );
}

export default DormspamFocusPage;
