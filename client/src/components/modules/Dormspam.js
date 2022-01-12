import React from "react";
import { format } from "date-fns";
import { IoExpandOutline, IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import Tag from "./Tag";

import "./Dormspam.css";

function Dormspam(props) {
    // focused
    if (props.focused) {
        return (
            <article id={`dormspam-${props.id}`} className="dormspam-focus">
                <div className="dormspam-toprow-focus">
                    <p className="dormspam-date">{format(props.date, "MMM dd")}</p>
                    <Link className="dormspam-close-button" to={`/findit`}>
                        <IoCloseOutline className="dormspam-icon" />
                    </Link>
                </div>
                <h2 className="dormspam-title dormspam-title-focus">{props.title}</h2>
                <div
                    className="dormspam-body-focus"
                    dangerouslySetInnerHTML={{ __html: props.body }}
                />
                <div className="dormspam-bottomrow-focus">
                    <Link
                        className="dormspam-author"
                        to="#"
                        onClick={(e) => {
                            window.location = `mailto:${props.address}`;
                            e.preventDefault();
                        }}
                    >
                        {props.author}
                    </Link>
                    <p className="dormspam-bctalk">{props.bctalk} for bc-talk</p>
                    <Tag text={props.tag} updateTags={props.updateTags} />
                </div>
            </article>
        );
    }
    // normal card, not focused
    return (
        <article id={`dormspam-${props.id}`} className="dormspam-nofocus">
            <div className="dormspam-toprow-nofocus">
                <p className="dormspam-date">{format(props.date, "MMM dd")}</p>
                <Link className="dormspam-expand-button" to={`/findit/dormspam/${props.id}`}>
                    <IoExpandOutline className="dormspam-icon" />
                </Link>
            </div>
            <h2 className="dormspam-title">{props.title}</h2>
            <hr />
            <div className="dormspam-bottomrow-nofocus">
                <Link
                    className="dormspam-author"
                    to="#"
                    onClick={(e) => {
                        window.location = `mailto:${props.address}`;
                        e.preventDefault();
                    }}
                >
                    {props.author}
                </Link>
                <Tag text={props.tag} updateTags={props.updateTags} />
            </div>
        </article>
    );
}

export default Dormspam;
