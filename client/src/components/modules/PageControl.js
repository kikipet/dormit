import React, { useState, useEffect } from "react";
import { IoCaretBack, IoCaretDown, IoCaretForward, IoCaretUp } from "react-icons/io5";

import "./PageControl.css";

function PageControl(props) {
    // const [prevDisabled, setPrevDisabled] = useState(props.pageNum === 1);
    // const [nextDisabled, setNextDisabled] = useState(props.pageNum === props.totalPages);
    // useEffect(() => {
    //     setPrevDisabled(props.pageNum === 1);
    //     setNextDisabled(props.pageNum === props.totalPages);
    // }, [props.pageNum]);
    return (
        <div className="page-controls">
            <button
                className="page-arrow"
                name="previousPage"
                onClick={(e) => props.pageUpdate(props.pageNum - 1)}
                disabled={props.pageNum === 1}
            >
                <IoCaretBack />
            </button>
            <p className="page-counter">
                page {props.pageNum} of {props.totalPages}
            </p>
            <button
                className="page-arrow"
                name="nextPage"
                onClick={(e) => props.pageUpdate(props.pageNum + 1)}
                disabled={props.pageNum === props.totalPages}
            >
                <IoCaretForward />
            </button>
        </div>
    );
}

export default PageControl;
