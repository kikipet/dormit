import React, { useState } from "react";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";

function SearchTag(props) {
    const [tagStatus, setStatus] = useState(props.tagStatus);
    function toggleTag() {
        setStatus(!tagStatus);
    }

    return (
        <div className={`search-tag search-tag-${tagStatus ? "" : "un"}selected`}>
            {props.text}
            <button
                onClick={(e) => {
                    props.toggleTag(props.text);
                    toggleTag();
                }}
            >
                {tagStatus ? <IoCloseOutline /> : <IoAddOutline />}
            </button>
        </div>
    );
}

export default SearchTag;
