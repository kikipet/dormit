import React from "react";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";

function SearchTag(props) {
    return (
        <button
            type="button"
            className={`search-tag search-tag-${props.tagStatus ? "" : "un"}selected`}
            onClick={(e) => {
                props.toggleTag(props.text);
            }}
        >
            <div className="search-tag-text">{props.text} </div>
            {props.tagStatus ? <IoCloseOutline className="search-tag-icon" /> : <IoAddOutline />}
        </button>
    );
}

export default SearchTag;
