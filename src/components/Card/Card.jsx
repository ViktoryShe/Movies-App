import React, { Component } from 'react'

import './Card.css'
import defaultImage from '../../assets/zaglushka.png'
import { truncateText } from '../../utils/utils'
import AlertMessage from '../AlertMessage/AlertMessage'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRating: props.userRating || 0,
      error: null,
    }
  }

  handleStarClick = async (index) => {
    const { id, handleStarClick } = this.props
    const rating = index + 1
    this.setState({ userRating: rating, error: null })
    try {
      await handleStarClick(index, id)
    } catch (error) {
      this.setState({ error })
    }
  }

  getRatingClass(rating) {
    if (rating <= 3) {
      return 'rating-low'
    } else if (rating <= 5) {
      return 'rating-medium-low'
    } else if (rating <= 7) {
      return 'rating-medium-high'
    } else {
      return 'rating-high'
    }
  }

  render() {
    const { title, date, genres, description, rating, image } = this.props
    const { error, userRating } = this.state
    const imageUrl = image !== 'N/A' ? image : defaultImage
    const truncatedDescription = truncateText(description, 150)
    const ratingClass = this.getRatingClass(rating)

    return (
      <div className="Card">
        {error && <AlertMessage message="Ошибка оценки фильма" description={error.message} type="error" />}
        <img src={imageUrl} className="card-image" alt={title} />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-date">{date}</p>
          <div className="card-genres">
            {genres.map((genre, index) => (
              <span key={`${genre}-${index}`} className="genre">
                {genre}
              </span>
            ))}
          </div>
          <p className="card-description">{truncatedDescription}</p>
          <div className={`card-rating ${ratingClass}`}>
            <span className="rating-number">{rating}</span>
          </div>
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
        </div>
      </div>
    )
  }
}
