import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// wait a sec will I want different things in the toolbar depending on device screen size?

function EmailEditor(props) {
    const modules = {
        toolbar: [
            [{ font: [] }, { size: [] }, { color: [] }, { background: [] }],
            ["bold", "italic", "underline", "strike", { script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    return (
        <ReactQuill theme="snow" modules={modules} value={props.value} onChange={props.onChange} />
    );
}

export default EmailEditor;
