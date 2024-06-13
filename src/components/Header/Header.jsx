import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  handleInputChange = (e) => {
    const query = e.target.value
    if (this.props.onSearch) {
      this.props.onSearch(query)
    }
  }
  handleTabClick = (tab) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(tab)
    }
  }

  render() {
    const { activeTab } = this.props
    return (
      <header className="Header">
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => this.handleTabClick('search')}
          >
            Search
          </div>
          <div className={`tab ${activeTab === 'rated' ? 'active' : ''}`} onClick={() => this.handleTabClick('rated')}>
            Rated
          </div>
        </div>
        {activeTab === 'search' && (
          <input type="text" className="search-bar" placeholder="Type to search..." onChange={this.handleInputChange} />
        )}
      </header>
    )
  }
}
