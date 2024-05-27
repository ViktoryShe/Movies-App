import React, { Component } from 'react'
import './App.css'

import Header from './components/Header/Header'
import CardList from './components/CardList/CardList'
import Footer from './components/Footer/Footer'
import { fetchMovies } from './utils/api'

export default class App extends Component {
  state = {
    films: [],
  }

  async componentDidMount() {
    const films = await fetchMovies('return')
    this.setState({ films })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <CardList films={this.state.films} />
        <Footer />
      </div>
    )
  }
}
