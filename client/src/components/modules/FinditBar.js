import React, { Component } from 'react';
import SearchBar from './SearchBar';
import './FinditBar.css'

function FinditBar(props) {
    return (
        <div className='finditbar'>
            <SearchBar />
        </div>
    )
}

export default FinditBar;