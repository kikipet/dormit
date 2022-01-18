import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultipleValueTextInput from "react-multivalue-text-input";
import { get, post } from "../../utilities";
import { validEmail } from "./regex";

import ColorPicker from "./ColorPicker";
import EmailEditor from "./EmailEditor";

import "./SenditForm.css";

function SenditForm(props) {
    const [title, setTitle] = useState("");
    const [to, setTo] = useState([]);
    const [cc, setCC] = useState([]);
    const [tagSelected, setTag] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [bodyHTML, setBodyHTML] = useState("");
    const [bctalk, setBCTalk] = useState("");
    const [color, setColor] = useState("#000000");

    const [draft, setDraft] = useState(props.draft);
    const [draftNum, setDraftNum] = useState(props.draftNum);
    const [draftFetched, setDraftFetched] = useState(false);
    console.log(draftFetched);
    if (draft && !draftFetched) {
        get("/api/getdraft", { draftNum: draftNum }).then((res) => {
            console.log(res);
            setTitle(res.subject);
            setTo(res.to);
            setCC(res.cc);
            setTag(res.tag);
            setBodyText(res.text);
            setBodyHTML(res.html);
            setBCTalk(res.bctalk);
            setColor(res.color);
            setDraftFetched(true);
        });
    }

    const [button, setButton] = useState("none");

    const [draftSaveDiv, setDraftSaveDiv] = useState(
        <div className="sendit-draft-saved-message"></div>
    );
    const [errMessages, setErrMessages] = useState([]);
    const [errMessageDiv, setErrContent] = useState(<div className="sendit-error-boxes"></div>);

    const tagOptions = ["club", "course", "event", "job", "advertisement", "survey", "other"];
    const navigate = useNavigate();

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
            let newErrList = [];
            // title should exist
            if (title === "") {
                newErrList.push("subject missing");
            }
            // color name for bc-talk should exist
            if (bctalk === "") {
                newErrList.push("bc-talk color missing");
            }
            // all email addresses should look valid
            let emailErr = false;
            if (to.length > 0) {
                for (var email of to) {
                    if (!validEmail.test(email)) {
                        emailErr = true;
                        break;
                    }
                }
            }
            if (cc.length > 0) {
                for (var email of cc) {
                    if (!validEmail.test(email)) {
                        emailErr = true;
                        break;
                    }
                }
            }
            if (emailErr) {
                newErrList.push("invalid recipient email(s)");
            }
            setErrMessages(newErrList);
            // send message
            if (newErrList.length === 0) {
                const emailObj = {
                    subject: title,
                    to: to,
                    senderName: props.userName,
                    cc: cc,
                    text: bodyText,
                    html: bodyHTML,
                    bctalk: bctalk,
                    color: color,
                    tag: tagSelected,
                };
                post("/api/sendemail", emailObj).then(navigate("/sendit/success"));
            }
        } else if (button === "savedraft") {
            const emailObj = {
                subject: title,
                to: to,
                senderName: props.userName,
                cc: cc,
                text: bodyText,
                html: bodyHTML,
                bctalk: bctalk,
                color: color,
                tag: tagSelected,
            };
            if (draft) {
                const query = { userId: props.userId, draft: emailObj, draftNum: draftNum };
                post("/api/savedraft", query).then((drafts) => {
                    setDraftSaveDiv(
                        <div className="message-box sendit-draft-saved-message">draft saved!</div>
                    );
                });
            } else {
                const query = { userId: props.userId, draft: emailObj };
                post("/api/createdraft", query).then((drafts) => {
                    setDraftSaveDiv(
                        <div className="message-box sendit-draft-saved-message">draft saved!</div>
                    );
                    // navigate to draft editor
                    setDraftFetched(true);
                    setDraft(true);
                    setDraftNum(drafts.length - 1);
                    navigate(`/sendit/draft/${drafts.length - 1}`, { replace: true });
                });
            }
        } else {
            if (confirm("are you sure you want to clear?")) {
                console.log("cleared");
                setTitle("");
                setTo([]);
                setCC([]);
                setBodyText("");
                setBodyHTML("");
                setBCTalk("");
                setColor("#000000");
                setTag("other");
                setButton("none");
                setErrMessages([]);
                setErrContent(<div></div>);
            }
        }
        event.preventDefault();
    }

    // render errors
    if (errMessages.length > 0) {
        setErrContent(
            <div className="sendit-error-boxes">
                {errMessages.map((message) => (
                    <p className="error-box">{message}</p>
                ))}
            </div>
        );
        setErrMessages([]);
    }

    return (
        <div className="form-container">
            {draftSaveDiv}
            {errMessageDiv}
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
                                values={to}
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
                                values={cc}
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
                                            checked={tag === tagSelected}
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
                <div className="button-container sendit-action-buttons">
                    <button
                        className="action-button sendit-clear"
                        name="clear"
                        type="submit"
                        onClick={(e) => setButton("clear")}
                    >
                        clear
                    </button>
                    {props.userId !== null ? (
                        <button
                            className="action-button sendit-savedraft"
                            name="savedraft"
                            type="submit"
                            onClick={(e) => setButton("savedraft")}
                        >
                            save draft
                        </button>
                    ) : (
                        <div style={{ margin: -8 }}></div>
                    )}
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
