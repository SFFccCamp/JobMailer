import React, { Component } from 'react';
import { fetchData } from '../utilities/fetchHttp';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';

import SearchResults from '../components/SearchResults'

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keywords: '',
            results: []
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
        this.setState( {
            results: []
        } )
        
        return fetchData( `https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0/item/16735011.json?print=pretty`)
            .pipe(
                switchMap( res => {
                    const kids = res.kids.splice(0, 120);
                    return this.handleHttpStream( kids, keywords )
                } ),
                catchError( err => _throw(err) )
            )
            .subscribe( 
                res => {
                    console.log( res );
                    if( res.length > 0 ) {
                        this.setState( {
                            results: [ ...this.state.results, ...res ]
                        } )
                    }
                },  
                err => console.log(err),
                completed => console.log( 'completed' )
            )
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
            <div>
              <div className="row">
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field col s9">
                    <label htmlFor="keyword search">Keywords</label>
                    <input id="keyword search"
                        placeholder="React, Angular, etc."
                        type="search"
                        onChange={this.handleInput} />
                  </div>
                  <div className="col s3">
                    <button type="submit" className="waves-effect waves-light btn">Search</button>
                  </div>
                </form>
              </div>

              <SearchResults results={ this.state.results } />
            </div>
        );
    }
}

export default SearchBar;
