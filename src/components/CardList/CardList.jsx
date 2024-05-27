import React, { Component } from 'react'
import { format } from 'date-fns'
import './CardList.css'

import Card from '../Card/Card'

export default class CardList extends Component {
  formatDate(releaseDate) {
    const date = releaseDate ? new Date(releaseDate) : null
    return date && !isNaN(date) ? format(date, 'MMMM d, yyyy') : 'Date not available'
  }

  createCard(film) {
    return (
      <Card
        key={film.id}
        title={film.title}
        date={this.formatDate(film.release_date)}
        tags={film.genre_ids || []}
        description={film.overview || 'No description available'}
        rating={film.vote_average ? film.vote_average.toFixed(1) : 'N/A'}
        image={film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : 'N/A'}
      />
    )
  }

  render() {
    const { films } = this.props

    return <div className="card-list">{films && films.map((film) => this.createCard(film))}</div>
  }
}
