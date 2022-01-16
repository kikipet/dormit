import React, { useState } from "react";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";

function SearchTag(props) {
    const [tagStatus, setStatus] = useState(props.tagStatus);
    function toggleTag() {
        setStatus(!tagStatus);
    }

    return (
        <button
            className={`search-tag search-tag-${tagStatus ? "" : "un"}selected`}
            onClick={(e) => {
                props.toggleTag(props.text);
                toggleTag();
            }}
        >
            {props.text} {tagStatus ? <IoCloseOutline /> : <IoAddOutline />}
        </button>
    );
}

export default SearchTag;
