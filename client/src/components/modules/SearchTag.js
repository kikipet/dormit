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
            {props.text} {props.tagStatus ? <IoCloseOutline /> : <IoAddOutline />}
        </button>
    );
}

export default SearchTag;
