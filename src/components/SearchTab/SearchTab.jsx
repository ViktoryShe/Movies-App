import React from 'react'

import CardList from '../CardList/CardList'

const SearchTab = ({ films, handleStarClick }) => {
  return (
    <div>
      {films.length > 0 ? (
        <CardList films={films} handleStarClick={handleStarClick} />
      ) : (
        <div>No search results found.</div>
      )}
    </div>
  )
}

export default SearchTab
