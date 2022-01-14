import { PromiseProvider } from "mongoose";
import React, { useState } from "react";
import MultipleValueTextInput from "react-multivalue-text-input";
import { post } from "../../utilities";

import ColorPicker from "./ColorPicker";
import EmailEditor from "./EmailEditor";

import "./SenditForm.css";

function SenditForm(props) {
    const [title, setTitle] = useState("");
    const [to, setTo] = useState([]);
    const [cc, setCC] = useState([]);
    const [tag, setTag] = useState("other");
    const [bodyText, setBodyText] = useState("");
    const [bodyHTML, setBodyHTML] = useState("");
    const [bctalk, setBCTalk] = useState("");
    const [color, setColor] = useState("#000000");
    const [button, setButton] = useState("none");
    const tagOptions = ["club", "course", "event", "job", "advertisement", "survey", "other"];

    /*
    current dummy mailing lists:
     * dormit-devtest-next (I'm a member)
     * dormit-devtest-sponge
     * dormit-devtest-maseeh -- send separately
     * dormit-sender
    */

    function handleToAdd(newEmail, allItems) {
        // email validation, required fields, etc.
        setTo(allItems);
    }

    function handleToDel(delEmail, allItems) {
        setTo(allItems);
    }

    function handleCCAdd(newEmail, allItems) {
        // email validation, required fields, etc.
        setCC(allItems);
    }

    function handleCCDel(delEmail, allItems) {
        setCC(allItems);
    }

    function handleBodyChange(html) {
        setBodyHTML(html);
        setBodyText(html);
    }

    function handleSubmit(event) {
        console.log(button);
        // submit
        if (button === "send") {
            console.log(props.userName);
            // title should exist
            if (title === "") {
                alert("subject missing");
            }
            // color name for bc-talk should exist
            else if (bctalk === "") {
                alert("bc-talk color missing");
            } else {
                const emailObj = {
                    subject: title,
                    to: to,
                    senderName: props.userName,
                    cc: cc,
                    text: bodyText,
                    html: bodyHTML,
                    bctalk: bctalk,
                    color: color,
                    tag: tag,
                };
                post("/api/sendemail", emailObj).then("Emails successful!");
            }
        } else if (button === "clear") {
            if (confirm("are you sure you want to clear?")) {
                console.log("cleared");
                setTitle("");
                setTo([]);
                setCC([]);
                setTag([]);
                setBodyText("");
                setBodyHTML("");
                setBCTalk("");
                setColor("#000000");
                setTag("other");
                setButton("none");
            }
        }
        event.preventDefault();
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-column-container sendit-column-container">
                    <div id="sendit-col1" className="form-column">
                        <label className="form-field">
                            subject
                            <input
                                className="form-input"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label className="form-field">
                            to
                            <MultipleValueTextInput
                                className="form-input"
                                onItemAdded={(item, allItems) => handleToAdd(item, allItems)}
                                onItemDeleted={(item, allItems) => handleToDel(item, allItems)}
                                name="to"
                                charCodes={[32]}
                                placeholder="separate emails with SPACE"
                            />
                        </label>

                        <label className="form-field">
                            cc
                            <MultipleValueTextInput
                                className="form-input"
                                onItemAdded={(item, allItems) => handleCCAdd(item, allItems)}
                                onItemDeleted={(item, allItems) => handleCCDel(item, allItems)}
                                name="cc"
                                charCodes={[32]}
                                placeholder="separate emails with SPACE"
                            />
                        </label>
                    </div>
                    <div id="sendit-col2" className="form-column">
                        <label className="form-field">
                            type of dormspam
                            {tagOptions.map((tag) => {
                                return (
                                    <div id={`sendit-tag-${tag}`} className="form-radio sendit-tag">
                                        <input
                                            className="form-input"
                                            key={tag}
                                            name="tag"
                                            type="radio"
                                            value={tag}
                                            checked={tag === tag}
                                            onChange={(e) => setTag(e.target.value)}
                                        />
                                        {tag}
                                    </div>
                                );
                            })}
                        </label>
                        <label className="form-field">
                            color name for bc-talk
                            <input
                                className="form-input"
                                name="bctalk"
                                type="text"
                                value={bctalk}
                                onChange={(e) => setBCTalk(e.target.value)}
                            />
                        </label>
                        <label className="form-field form-field-color">
                            color of bc-talk text
                            <ColorPicker
                                colors={[
                                    "#000",
                                    "#023bff",
                                    "#f821ff",
                                    "#8011dd",
                                    "#999999",
                                    "#ee0000",
                                    "#17901c",
                                    "#ff8000",
                                    "#ffee00",
                                ]}
                                color={color}
                                onChange={(e) => setColor(e.hex)}
                            />
                        </label>
                        {/* <label className='form-field'>
                    attach file
                    <input id='sendit-file' 
                    name='file' 
                    type='file' />
                </label> */}
                    </div>
                </div>
                <div className="sendit-body-container">
                    <label className="form-field">
                        body
                        <EmailEditor
                            className="sendit-body-editor"
                            onChange={(html) => handleBodyChange(html)}
                        />
                    </label>
                </div>
                <div className="sendit-action-buttons">
                    <button
                        className="action-button sendit-clear"
                        name="clear"
                        type="submit"
                        onClick={() => setButton("clear")}
                    >
                        clear
                    </button>
                    <button
                        className="action-button sendit-savedraft"
                        name="savedraft"
                        type="submit"
                        onClick={(e) => setButton("savedraft")}
                    >
                        save draft
                    </button>
                    <button
                        className="action-button sendit-submit"
                        name="send"
                        type="submit"
                        onClick={(e) => setButton("send")}
                    >
                        send dormspam
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SenditForm;
