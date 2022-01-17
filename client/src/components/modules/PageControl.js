import React, { useState } from "react";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

import "./PageControl.css";

function PageControl(props) {
    const [pageInput, setPageInput] = useState(props.pageNum);

    function pageFieldUpdate(newPage) {
        props.pageUpdate(newPage);
        setPageInput(newPage);
    }

    function handlePageJump(event) {
        if (isNaN(pageInput) || pageInput > props.totalPages) {
            setPageInput(props.pageNum);
        } else {
            props.pageUpdate(pageInput);
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
                        value={pageInput}
                        onChange={(e) => setPageInput(e.target.value)}
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
