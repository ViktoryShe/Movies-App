import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import debounce from 'lodash.debounce'
import './App.css'

import Header from '../Header/Header'
import CardList from '../CardList/CardList'
import Footer from '../Footer/Footer'
import { fetchMovies, fetchRandomMovies, createGuestSession } from '../../utils/api'
import Spinner from '../Spin/Spin'
import ErrorComponent from '../Error/Error'
import NoResults from '../NoResults/NoResults'
import OfflineMessage from '../OfflineMessage/OfflineMessage'

export default class App extends Component {
  state = {
    films: [],
    loading: false,
    error: false,
    query: '',
    totalResults: 0,
    currentPage: 1,
  }

  componentDidMount() {
    this.createGuestSession()
    this.loadRandomMovies()
  }

  loadRandomMovies = async (page = 1) => {
    this.setState({ loading: true, error: false })

    try {
      const { results, total_results } = await fetchRandomMovies(page)
      this.setState({
        films: results,
        loading: false,
        totalResults: total_results,
        currentPage: page,
      })
    } catch (error) {
      this.setState({ error: true, loading: false })
    }
  }

  createGuestSession = async () => {
    try {
      const guestSessionId = await createGuestSession()
      this.setState({ guestSessionId })
      console.log('Guest session created with ID:', guestSessionId)
    } catch (error) {
      console.error('Error creating guest session:', error)
    }
  }

  searchMovies = debounce(async (query = this.state.query, page = 1) => {
    this.setState({ loading: true, error: false })

    try {
      const { results, total_results } = await fetchMovies(query, page)
      this.setState({
        films: results,
        loading: false,
        totalResults: total_results,
        currentPage: page,
      })
    } catch (error) {
      this.setState({ error: true, loading: false })
    }
  }, 500)

  updateSearchResults = (films, totalResults, currentPage) => {
    this.setState({ films, totalResults, currentPage })
  }

  onSearch = (query) => {
    this.setState({ query, currentPage: 1 }, () => {
      if (query) {
        this.searchMovies(query)
      } else {
        this.updateSearchResults([], 0, 1)
      }
    })
  }

  onPageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.searchMovies(this.state.query, page)
    })
  }

  renderContent = () => {
    const { films, loading, error } = this.state
    const hasData = !loading && !error

    if (loading) return <Spinner />
    if (error) return <ErrorComponent />
    if (films.length === 0) return <NoResults />
    if (hasData) return <CardList films={films} />
    return null
  }

  render() {
    const { currentPage, totalResults } = this.state
    const totalPages = Math.min(Math.ceil(totalResults / 20), 100)

    return (
      <div className="App">
        <Header onSearch={this.onSearch} />
        <Offline>
          <OfflineMessage />
        </Offline>
        <Online>{this.renderContent()}</Online>
        <Footer currentPage={currentPage} totalPages={totalPages} onPageChange={this.onPageChange} />
      </div>
    )
  }
}
