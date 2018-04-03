import React from 'react';

const SearchBar = () => {
  return (
    <form>
      <label htmlFor="keyword">Keywords</label>
      <input id="keyword" placeholder="React, Angular, etc." />

      <button>Search</button>
    </form>
  );
}

export default SearchBar;
