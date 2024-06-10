import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import debounce from 'lodash.debounce'
import './App.css'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { fetchMovies, fetchRandomMovies, createGuestSession, rateMovie } from '../../utils/api'
import Spinner from '../Spin/Spin'
import ErrorComponent from '../Error/Error'
import NoResults from '../NoResults/NoResults'
import OfflineMessage from '../OfflineMessage/OfflineMessage'
import SearchTab from '../SearchTab/SearchTab'
import RatedTab from '../RatedTab/RatedTab'
import { GenresProvider } from '../GenresContext/GenresContext'

export default class App extends Component {
  state = {
    films: [],
    loading: false,
    error: false,
    query: '',
    totalResults: 0,
    currentPage: 1,
    activeTab: 'search',
    guestSessionId: '',
    ratedMovies: [],
    currentPageRated: 1,
    ratedTotalPages: 1,
  }

  componentDidMount() {
    this.createGuestSession()
  }

  createGuestSession = async () => {
    try {
      const guestSessionId = await createGuestSession()
      localStorage.setItem('guestSessionId', guestSessionId)
      console.log('Guest session created with ID:', guestSessionId)
      this.setState({ guestSessionId })
      this.loadRandomMovies()
    } catch (error) {
      console.error('Error creating guest session:', error)
    }
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

  searchMovies = debounce(async (query = this.state.query, page = 1) => {
    this.setState({ loading: true, error: false })

    try {
      const { results, total_results } = await fetchMovies(query, page)
      const updatedResults = results.map((movie) => {
        const ratedMovie = this.state.ratedMovies.find((rated) => rated.movieId === movie.id)
        return ratedMovie ? { ...movie, rating: ratedMovie.rating } : movie
      })

      this.setState({
        films: updatedResults,
        loading: false,
        totalResults: total_results,
        currentPage: page,
      })
    } catch (error) {
      this.setState({ error: true, loading: false })
    }
  }, 500)

  rateMovieHandler = async (movieId, rating) => {
    try {
      await rateMovie(movieId, rating, this.state.guestSessionId)
      this.setState((prevState) => ({
        ratedMovies: [...prevState.ratedMovies, { movieId, rating }],
        ratedTotalPages: Math.ceil((prevState.ratedMovies.length + 1) / 20),
      }))
    } catch (error) {
      console.error('Error rating movie:', error)
    }
  }

  handleStarClick = async (index, movieId) => {
    const rating = index + 1
    console.log(`You rated the movie with ID "${movieId}" ${rating}`)
    try {
      await this.rateMovieHandler(movieId, rating)
      this.setState((prevState) => ({
        films: prevState.films.map((film) => (film.id === movieId ? { ...film, rating } : film)),
      }))
    } catch (error) {
      console.error('Error rating movie:', error)
    }
  }
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

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab })
  }

  renderContent = () => {
    const { films, loading, error, activeTab, ratedMovies, currentPageRated, ratedTotalPages } = this.state
    const hasData = !loading && !error

    if (loading) return <Spinner />
    if (error) return <ErrorComponent />
    if (activeTab === 'search' && hasData) {
      if (films.length === 0) return <NoResults />
      return (
        <GenresProvider>
          <SearchTab films={films} guestSessionId={this.state.guestSessionId} handleStarClick={this.handleStarClick} />
        </GenresProvider>
      )
    }
    if (activeTab === 'rated') {
      return (
        <RatedTab
          ratedMovies={ratedMovies}
          currentPageRated={currentPageRated}
          ratedTotalPages={ratedTotalPages}
          handleStarClick={this.handleStarClick}
        />
      )
    }
    return null
  }

  render() {
    const { currentPage, totalResults, activeTab } = this.state
    const totalPages = Math.min(Math.ceil(totalResults / 20), 100)

    return (
      <div className="App">
        <Header onSearch={this.onSearch} onTabChange={this.handleTabChange} activeTab={activeTab} />
        <Offline>
          <OfflineMessage />
        </Offline>
        <Online>{this.renderContent()}</Online>
        <Footer currentPage={currentPage} totalPages={totalPages} onPageChange={this.onPageChange} />
      </div>
    )
  }
}
