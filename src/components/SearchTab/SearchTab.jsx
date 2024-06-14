import React from 'react'

import CardList from '../CardList/CardList'
import AlertMessage from '../AlertMessage/AlertMessage'

const SearchTab = ({ films, handleStarClick }) => {
  return (
    <div>
      {films.length > 0 ? (
        <CardList films={films} handleStarClick={handleStarClick} />
      ) : (
        <AlertMessage message="Нет результатов" type="warning" />
      )}
    </div>
  )
}

export default SearchTab
