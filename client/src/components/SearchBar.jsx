import React, { Component } from 'react';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keywords: []
        }
    }

    render() {
        return (
            <form>
                <label htmlFor="keyword">Keywords</label>
                <input id="keyword" placeholder="React, Angular, etc." />
                <button>Search</button>
            </form>
        );
    }
}

export default SearchBar;
