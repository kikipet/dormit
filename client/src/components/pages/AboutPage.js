import React from "react";
import { Link } from "react-router-dom";

function AboutPage(props) {
    return (
        <div id="about" className="page-container">
            <Link to="/about" id="profile-title" className="page-title">
                about
            </Link>
            <div className="page-body">
                <p>
                    dormit was created during web.lab 2022 to give MIT students a centralized
                    location for all things dormspam.
                </p>
                <h2>sendit</h2>
                <p>
                    sendit makes the process of sending dormspams easier and more convenient.
                    Dormspams have many rules that need to be followed in order to send them (see{" "}
                    <a href="https://how-to-dormspam.mit.edu">here</a>), and when these are not
                    followed, the sender inadvertently annoys the MIT undergraduates who receive
                    their email and may lose credibility.
                </p>
                <p>
                    By default, sendit has no recipients other than the dorm mailing lists
                    themselves, and bcc'ing/sending directly to these mailing lists is taken care of
                    by the website.
                </p>
                <h2>findit</h2>
                <p>
                    findit retrieves all dormspams sent since fall 2021 and makes them searchable by
                    content, date sent, type of dormspam, and bc-talk color. Individual dormspams
                    can also be starred for future reference.
                </p>
            </div>
        </div>
    );
}

export default AboutPage;
