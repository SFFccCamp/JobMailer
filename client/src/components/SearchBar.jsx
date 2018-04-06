import React, { Component } from 'react';
import { fetchData } from '../utilities/fetchHttp';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keywords: ''
        }

        this.handleInput  = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }


    handleInput(e) {
        this.setState( {
            keywords: e.target.value
        } )
    }


    handleSubmit(e) {
        e.preventDefault();
        const { keywords } = this.state;
        fetchData( '/searchHn/16735011', 'POST', { keywords } )
            .then( res => console.log(res) )
            .catch( err => console.log(err) )
    }


    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <label htmlFor="keyword">Keywords</label>
                <input id="keyword" 
                       placeholder="React, Angular, etc."
                       onChange={ this.handleInput }/>
                <button type="submit" className="waves-effect waves-light btn">Search</button>
            </form>
        );
    }
}

export default SearchBar;
