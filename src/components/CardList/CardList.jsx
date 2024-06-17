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

  const genreMap = new Map(genres.map((genre) => [genre.id, genre.name]))

  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => genreMap.get(id) || 'Unknown Genre')
  }

  if (!films || films.length === 0) {
    return <div className="card-list">No films available</div>
  }

  return (
    <div className="card-list">
      {films.map((film) => {
        const { id, title, release_date: releaseDate, overview, vote_average, poster_path: posterPath, rating } = film
        const genreNames = getGenreNames(film.genre_ids || [])

        return (
          <Card
            key={id}
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
      })}
    </div>
  )
}

export default CardList
