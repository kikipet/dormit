import React from "react";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

import "./PageControl.css";

function PageControl(props) {
    function pageFieldUpdate(newPage) {
        props.pageUpdate(newPage);
        props.setPageInput(newPage);
    }

    function handlePageJump(event) {
        if (isNaN(props.pageInput) || props.pageInput > props.totalPages) {
            props.setPageInput(props.pageNum);
        } else {
            props.pageUpdate(props.pageInput);
        }
        event.preventDefault();
    }

    return (
        <div className="page-controls">
            <button
                className="page-arrow"
                name="previousPage"
                onClick={(e) => pageFieldUpdate(props.pageNum - 1)}
                disabled={props.pageNum == 1}
            >
                <IoCaretBack />
            </button>
            <div className="page-counter">
                <p>page </p>
                <form className="page-input" onSubmit={handlePageJump}>
                    <input
                        className="form-input page-num"
                        name="pageNum"
                        type="text"
                        value={props.pageInput}
                        onChange={(e) => props.setPageInput(e.target.value)}
                    />
                </form>
                <p> of {props.totalPages}</p>
            </div>
            <button
                className="page-arrow"
                name="nextPage"
                onClick={(e) => pageFieldUpdate(props.pageNum + 1)}
                disabled={props.pageNum == props.totalPages}
            >
                <IoCaretForward />
            </button>
        </div>
    );
}

export default PageControl;
