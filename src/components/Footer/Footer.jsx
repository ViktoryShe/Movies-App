import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {
  calculateStartAndEndPages = () => {
    const { currentPage, totalPages } = this.props
    let startPage = currentPage - 1
    let endPage = currentPage + 1

    if (totalPages <= 3) {
      startPage = 2
      endPage = totalPages - 1
    } else {
      if (currentPage <= 2) {
        startPage = 2
        endPage = 4
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3
        endPage = totalPages - 1
      }
    }

    return { startPage, endPage }
  }
  renderPageNumbers = () => {
    const { onPageChange } = this.props
    const { startPage, endPage } = this.calculateStartAndEndPages()
    const pages = []

    const renderPage = (pageNumber) => (
      <span
        key={pageNumber}
        className={`page ${this.props.currentPage === pageNumber ? 'active' : ''}`}
        onClick={() => onPageChange(pageNumber)}
      >
        {pageNumber}
      </span>
    )

    if (startPage > 1) {
      pages.push(
        renderPage(1),
        <span key="dots_1" className="dots">
          ...
        </span>
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(renderPage(i))
    }

    if (endPage < this.props.totalPages) {
      pages.push(
        <span key="dots_2" className="dots">
          ...
        </span>,
        renderPage(this.props.totalPages)
      )
    }

    return pages
  }

  render() {
    return (
      <footer className="Footer">
        <div className="pagination">{this.renderPageNumbers()}</div>
      </footer>
    )
  }
}
