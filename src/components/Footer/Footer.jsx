import React, { Component } from 'react'
import { Pagination } from 'antd'
import './Footer.css'

export default class Footer extends Component {
  handlePageChange = (page) => {
    this.props.onPageChange(page)
  }

  render() {
    const { currentPage, totalPages } = this.props

    return (
      <footer className="Footer">
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          pageSize={10}
          onChange={this.handlePageChange}
          showSizeChanger={false}
        />
      </footer>
    )
  }
}
