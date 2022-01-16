import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

function SearchBar(props) {
    function handleSubmit(event) {
        props.updateSearchSimple(props.searchText);
        props.setSearchText("");
        event.preventDefault();
    }

    if (props.simple) {
        return (
            <form onSubmit={handleSubmit} className="findit-searchbar-container">
                <input
                    className="form-input findit-searchbar"
                    name="search"
                    type="text"
                    value={props.searchText}
                    onChange={(e) => props.setSearchText(e.target.value)}
                    placeholder="search"
                />
                <button type="submit" className="search-button">
                    <IoSearch />
                </button>
            </form>
        );
    }

    return (
        <input
            className="form-input findit-searchbar"
            name="search"
            type="text"
            value={props.searchText}
            onChange={(e) => props.setSearchText(e.target.value)}
            placeholder="search"
        />
    );
}

export default SearchBar;
