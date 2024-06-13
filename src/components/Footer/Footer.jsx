import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {
  renderPageNumbers = () => {
    const { onPageChange, currentPage, totalPages } = this.props
    const pages = []

    const renderPage = (pageNumber) => (
      <span
        key={`page_${pageNumber}`}
        className={`page ${currentPage === pageNumber ? 'active' : ''}`}
        onClick={() => onPageChange(pageNumber)}
      >
        {pageNumber}
      </span>
    )

    if (currentPage > 1) {
      pages.push(
        <span key="prev" className="arrow" onClick={() => onPageChange(currentPage - 1)}>
          &laquo;
        </span>
      )
    }

    if (currentPage > 2) {
      pages.push(renderPage(currentPage - 1))
    }

    pages.push(renderPage(currentPage))

    if (currentPage < totalPages - 1) {
      pages.push(renderPage(currentPage + 1))
    }

    if (currentPage < totalPages) {
      pages.push(
        <span key="next" className="arrow" onClick={() => onPageChange(currentPage + 1)}>
          &raquo;
        </span>
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
