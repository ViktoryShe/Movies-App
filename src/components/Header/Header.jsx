import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  handleInputChange = (e) => {
    const query = e.target.value
    if (this.props.onSearch) {
      this.props.onSearch(query)
    }
  }

  render() {
    return (
      <header className="Header">
        <div className="tabs">
          <div className="tab active">Search</div>
          <div className="tab">Rated</div>
        </div>
        <input type="text" className="search-bar" placeholder="Type to search..." onChange={this.handleInputChange} />
      </header>
    )
  }
}
