import React from 'react';

const SearchResults = ( { results } ) => {

    const allResults = function(results) {

        if(results.length === 0) {
            return ( <h1>No Data Found</h1> );
        }

        return results.map( ( res, i ) => {
          console.log(res.text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi));

          return (
            <li
              className="collection-item"
              key={ i }
              dangerouslySetInnerHTML={{ __html: res.text }} />
          );
        })
    }

    return (
        <ul className="collection">
            { allResults(results) }
        </ul>
    );
};

export default SearchResults;
