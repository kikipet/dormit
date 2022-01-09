import React, { useState, useEffect, Component } from 'react';
import { format } from 'date-fns';

import FinditBar from '../modules/FinditBar';
import Dormspam from '../modules/Dormspam';

import './FinditPage.css'

function FinditPage(props) {
    const [dormspams, setDormspams] = useState([]);

    // called when the "Feed" component "mounts", i.e.
    // when it shows up on screen
    useEffect(() => {
        get("/api/dormspams").then((dormspamObjs) => {
        let reversedDormspamObjs = dormspamObjs.reverse();
        setDormspams(reversedDormspamObjs);
        });
    }, []);

    // this gets called when the user pushes "Submit", so their
    // post gets added to the screen right away
    const addNewStory = (storyObj) => {
        setStories([storyObj].concat(stories));
    };

    let dormspamsList = null;
    const hasDormspams = dormspams.length !== 0;
    if (hasDormspams) {
        dormspamsList = dormspams.map((dormspamObj) => (
            <Dormspam 
                id={dormspamObj._id}
                date={dormspamObj.date}
                title={dormspamObj.title}
                author={dormspamObj.author}
                body={'The following content is provided under a Creative Commons license. Your support will help MIT OpenCourseWare continue to offer high-quality educational resources for free. To make a donation or to view additional materials from hundreds of MIT courses, visit MIT OpenCourseWare at ocw.mit.edu.'}
                bctalk='maroon'
                tag='advertisement' 
                focused={false}
            />
        ));
    } else {
        dormspamsList = <div>no dormspams!</div>;
    }

    return (
        <div id='findit' className='page-container'>
            <h1 id='findit-title' className='page-title'>findit</h1>
            <div className='findit-container'>
                <div class='finditbar-container'>
                    <FinditBar />
                </div>
                <div className='dormspams-container'>
                    {dormspamsList}
                </div>
            </div>
        </div>
    );
}

export default FinditPage;
