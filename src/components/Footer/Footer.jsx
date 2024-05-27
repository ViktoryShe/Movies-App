import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <div className="pagination">
          <span className="page">1</span>
          <span className="page">2</span>
          <span className="page">3</span>
          <span className="page">4</span>
          <span className="page">5</span>
        </div>
      </footer>
    )
  }
}
