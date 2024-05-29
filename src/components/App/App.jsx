import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import './App.css'

import Header from '../Header/Header'
import CardList from '../CardList/CardList'
import Footer from '../Footer/Footer'
import { fetchMovies } from '../../utils/api'
import Spin from '../Spin/Spin'
import ErrorComponent from '../Error/Error'

export default class App extends Component {
  state = {
    films: [],
    loading: true,
    error: false,
  }

  async componentDidMount() {
    try {
      const films = await fetchMovies('return')
      this.setState({ films, loading: false })
    } catch (error) {
      this.setState({ error: true, loading: false })
    }
  }

  render() {
    const { films, loading, error } = this.state
    const hasData = !loading && !error
    const errorMessage = error ? <ErrorComponent /> : null
    const spin = loading ? <Spin /> : null
    const content = hasData ? <CardList films={films} /> : null

    return (
      <div className="App">
        <Header />
        <Offline>
          <div className="offline-message">Нет сети. Проверьте ваше подключение к интернету.</div>
        </Offline>
        <Online>
          {errorMessage}
          {spin}
          {content}
        </Online>
        <Footer />
      </div>
    )
  }
}
