import React, { Component } from 'react'

import './Card.css'
import defaultImage from '../../assets/zaglushka.png'
import { truncateText } from '../../utils/utils'

export default class Card extends Component {
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

    return (
      <div className="Card">
        <img src={imageUrl} className="card-image" alt={title} />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-date">{date}</p>
          <div className="card-tags">{this.renderTags(tags)}</div>
          <p className="card-description">{truncatedDescription}</p>
          <span className="rating-number">{rating}</span>
        </div>
      </div>
    )
  }
}
