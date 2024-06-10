import React, { Component } from 'react'
import { format } from 'date-fns'

import './CardList.css'
import Card from '../Card/Card'
import GenresContext from '../GenresContext/GenresContext'

export default class CardList extends Component {
  static contextType = GenresContext

  formatDate(releaseDate) {
    const date = releaseDate ? new Date(releaseDate) : null
    return date && !isNaN(date) ? format(date, 'MMMM d, yyyy') : 'Date not available'
  }

  getGenreNames(genreIds) {
    const genres = this.context
    return genreIds.map((id) => {
      const genre = genres.find((genre) => genre.id === id)
      return genre ? genre.name : 'Unknown Genre'
    })
  }

  createCard = (film) => {
    const { id, title, release_date: releaseDate, overview, vote_average, poster_path: posterPath, rating } = film
    return (
      <Card
        key={id}
        id={id}
        title={title}
        date={this.formatDate(releaseDate)}
        genres={this.getGenreNames(film.genre_ids || [])}
        description={overview || 'No description available'}
        rating={vote_average ? vote_average.toFixed(1) : rating || 'N/A'}
        image={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'N/A'}
        guestSessionId={this.props.guestSessionId}
        handleStarClick={this.props.handleStarClick}
        userRating={rating}
      />
    )
  }

  render() {
    const { films } = this.props
    return <div className="card-list">{films.map(this.createCard)}</div>
  }
}
