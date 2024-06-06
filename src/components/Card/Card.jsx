import React, { Component } from 'react'

import './Card.css'
import defaultImage from '../../assets/zaglushka.png'
import { truncateText } from '../../utils/utils'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRating: 0,
    }
  }

  handleStarClick = (index) => {
    this.setState({ userRating: index + 1 })
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

  renderTags(tags) {
    return tags.map((tag) => (
      <span key={tag} className="tag">
        {tag}
      </span>
    ))
  }

  render() {
    const { title, date, tags, description, rating, image } = this.props
    const imageUrl = image !== 'N/A' ? image : defaultImage
    const truncatedDescription = truncateText(description, 150)
    const ratingColor = this.getRatingColor(rating)

    return (
      <div className="Card">
        <img src={imageUrl} className="card-image" alt={title} />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-date">{date}</p>
          <div className="card-tags">{this.renderTags(tags)}</div>
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
