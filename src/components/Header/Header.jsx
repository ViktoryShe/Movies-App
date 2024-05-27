import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <header className="Header">
        <div className="tabs">
          <div className="tab active">Search</div>
          <div className="tab">Rated</div>
        </div>
        <input type="text" className="search-bar" placeholder="Type to search..." />
      </header>
    )
  }
}
