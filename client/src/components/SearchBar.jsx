import React, { Component } from 'react';
import { fetchData } from '../utilities/fetchHttp';
import { Observable } from 'rxjs';

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
        fetch( `https://hacker-news.firebaseio.com/v0/item/16735011.json?print=pretty`)
         .then( result => result.json() )
         .then( result => {
            const kids = result.kids.splice(0, 120);
            this.handleHttpStream( kids, 'angular' )
                .subscribe( res => console.log( res ) )
         } )
    }


    handleHttpStream( array, filter ) {

        return new Observable( obs => {
            
            ( function handleChunk( array, filter ) {
                if( array.length === 0 ) return obs.complete()
                let subArr = array.splice( 0, 20 );
                return Promise.all( subArr.map( kid  => {
                    return fetch( `https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty` )
                            .then( res => res.json() )
                            .catch( err => err )
                } ) )
                .then( data => {
                    let mappedData = data.filter( e => e.text.includes(filter) )
                    obs.next(mappedData)
                    handleChunk( array, filter );
                } )
            } )( array, filter )
        } )
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