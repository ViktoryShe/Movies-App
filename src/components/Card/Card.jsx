import React, { Component } from 'react'

import './Card.css'
import defaultImage from '../../assets/zaglushka.png'
import { truncateText } from '../../utils/utils'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRating: props.userRating || 0,
    }
  }

  handleStarClick = async (index) => {
    const { id, handleStarClick } = this.props
    const rating = index + 1
    console.log(`You rated the movie with ID "${id}" ${rating}`)
    this.setState({ userRating: rating })
    try {
      await handleStarClick(index, id)
    } catch (error) {
      console.error('Error rating movie:', error)
    }
  }

  getRatingColor(rating) {
    if (rating <= 3) {
      return '#E90000'
    } else if (rating <= 5) {
      return '#E97E00'
    } else if (rating <= 7) {
      return '#E9D100'
    } else {
      return '#66E900'
    }
  }

  renderStars() {
    const { userRating } = this.state
    return (
      <div className="card-stars">
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < userRating ? 'filled' : ''}`}
            onClick={() => this.handleStarClick(index)}
          >
            &#9733;
          </span>
        ))}
      </div>
    )
  }

  renderGenres(genres) {
    return genres.map((genre, index) => (
      <span key={`${genre}-${index}`} className="genre">
        {genre}
      </span>
    ))
  }

  getGenreNames(genreIds) {
    const { genres } = this.props
    return genreIds.map((id) => {
      const genre = genres.find((genre) => genre.id === id)
      return genre ? genre.name : 'Unknown Genre'
    })
  }

  render() {
    const { title, date, genres, description, rating, image } = this.props
    const imageUrl = image !== 'N/A' ? image : defaultImage
    const truncatedDescription = truncateText(description, 150)
    const ratingColor = this.getRatingColor(rating)

    return (
      <div className="Card">
        <img src={imageUrl} className="card-image" alt={title} />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-date">{date}</p>
          <div className="card-genres">{this.renderGenres(genres)}</div>
          <p className="card-description">{truncatedDescription}</p>
          <div className="card-rating" style={{ borderColor: ratingColor }}>
            <span className="rating-number">{rating}</span>
          </div>
          {this.renderStars()}
        </div>
      </div>
    )
  }
}
