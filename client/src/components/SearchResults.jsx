import React from 'react';

const SearchResults = ( { results } ) => {

    const allResults = function(results) {

        if(results.length === 0) {
            return ( <h1>No Data Found</h1> );
        }

        return results.map( ( res, i ) => {
            return <h1 key={ i }>{ res.by }</h1>
        } )
    }


    return (
        <div>
            { allResults(results) }
        </div>
    );
};

export default SearchResults;