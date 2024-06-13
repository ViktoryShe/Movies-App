import React, { useContext } from 'react'
import { format } from 'date-fns'

import './CardList.css'
import Card from '../Card/Card'
import GenresContext from '../GenresContext/GenresContext'

const CardList = ({ films, handleStarClick, guestSessionId }) => {
  const genres = useContext(GenresContext)

  const formatDate = (releaseDate) => {
    const date = releaseDate ? new Date(releaseDate) : null
    return date && !isNaN(date) ? format(date, 'MMMM d, yyyy') : 'Date not available'
  }

  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => {
      const genre = genres.find((genre) => genre.id === id)
      return genre ? genre.name : 'Unknown Genre'
    })
  }

  const createCard = (film, index) => {
    const { id, title, release_date: releaseDate, overview, vote_average, poster_path: posterPath, rating } = film
    const genreNames = getGenreNames(film.genre_ids || [])
    return (
      <Card
        key={`${id}-${index}`}
        id={id}
        title={title}
        date={formatDate(releaseDate)}
        genres={genreNames}
        description={overview || 'No description available'}
        rating={vote_average ? vote_average.toFixed(1) : rating || 'N/A'}
        image={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'N/A'}
        guestSessionId={guestSessionId}
        handleStarClick={handleStarClick}
        userRating={rating}
      />
    )
  }

  return <div className="card-list">{films.map(createCard)}</div>
}

export default CardList
