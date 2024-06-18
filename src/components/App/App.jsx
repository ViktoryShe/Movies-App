import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import debounce from 'lodash.debounce'
import './App.css'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { fetchMovies, fetchRandomMovies, createGuestSession, rateMovie } from '../../api/api'
import AlertMessage from '../AlertMessage/AlertMessage'
import Content from '../Content/Content'

export default class App extends Component {
  state = {
    films: [],
    loading: false,
    error: false,
    errorMessage: '',
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
    const storedGuestSessionId = localStorage.getItem('guestSessionId')
    const storedRatedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || []

    if (storedGuestSessionId) {
      this.setState({ guestSessionId: storedGuestSessionId, ratedMovies: storedRatedMovies }, this.loadRandomMovies)
    } else {
      this.createGuestSession()
    }
  }

  createGuestSession = async () => {
    try {
      const guestSessionId = await createGuestSession()
      const url = new URL(window.location.href)
      url.searchParams.set('guestSessionId', guestSessionId)
      localStorage.setItem('guestSessionId', guestSessionId)
      this.setState({ guestSessionId }, this.loadRandomMovies)
    } catch (error) {
      this.setError(error.message)
    }
  }

  loadRandomMovies = async (page = 1) => {
    this.setLoading(true)
    try {
      const { results, total_results } = await fetchRandomMovies(page)
      const storedRatedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || []
      const updatedResults = results.map((movie) => {
        const ratedMovie = storedRatedMovies.find((rated) => rated.movieId === movie.id)
        return ratedMovie ? { ...movie, rating: ratedMovie.rating } : movie
      })

      this.setState({
        films: updatedResults,
        loading: false,
        totalResults: total_results,
        currentPage: page,
      })
    } catch (error) {
      this.setError(error.message)
    }
  }

  searchMovies = debounce(async (query = this.state.query, page = 1) => {
    this.setLoading(true)
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
      this.setError(error.message)
    }
  }, 500)

  rateMovieHandler = async (movieId, rating) => {
    try {
      await rateMovie(movieId, rating, this.state.guestSessionId)
      this.setState((prevState) => {
        const updatedRatedMovies = prevState.ratedMovies.filter((movie) => movie.movieId !== movieId)
        updatedRatedMovies.push({ movieId, rating })
        localStorage.setItem('ratedMovies', JSON.stringify(updatedRatedMovies))
        return {
          ratedMovies: updatedRatedMovies,
          ratedTotalPages: Math.ceil(updatedRatedMovies.length / 20),
        }
      })
    } catch (error) {
      this.setError(error.message)
    }
  }

  handleStarClick = async (index, movieId) => {
    const rating = index + 1
    try {
      await this.rateMovieHandler(movieId, rating)
      this.setState((prevState) => ({
        films: prevState.films.map((film) => (film.id === movieId ? { ...film, rating } : film)),
      }))
    } catch (error) {
      this.setError(error.message)
    }
  }

  onSearch = async (query) => {
    this.setLoading(true)
    try {
      this.setState({ query, currentPage: 1, error: false })
      if (query) {
        await this.searchMovies(query)
      } else {
        this.updateSearchResults([], 0, 1)
      }
    } catch (error) {
      this.setError(error.message)
    }
  }

  onPageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.searchMovies(this.state.query, page)
    })
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab })
  }

  handleRatedPageChange = (page) => {
    this.setState({ currentPageRated: page })
  }

  setLoading = (loading) => {
    this.setState({ loading, error: false, errorMessage: '' })
  }

  setError = (message) => {
    this.setState({ error: true, loading: false, errorMessage: message })
  }

  render() {
    const { currentPage, totalResults, activeTab, ratedMovies, currentPageRated, error } = this.state
    const totalPages = Math.ceil(totalResults / 20)
    const ratedTotalPages = Math.ceil(ratedMovies.length / 20)
    return (
      <div className="App">
        <Header onSearch={this.onSearch} onTabChange={this.handleTabChange} activeTab={activeTab} />
        <Offline>
          {error && <AlertMessage message="Ошибка" description={this.state.errorMessage} type="error" />}
        </Offline>
        <Online>
          {error}
          <Content
            films={this.state.films}
            loading={this.state.loading}
            error={this.state.error}
            activeTab={this.state.activeTab}
            ratedMovies={this.state.ratedMovies}
            currentPageRated={this.state.currentPageRated}
            ratedTotalPages={this.state.ratedTotalPages}
            guestSessionId={this.state.guestSessionId}
            handleStarClick={this.handleStarClick}
          />
        </Online>
        {activeTab === 'search' ? (
          <Footer currentPage={currentPage} totalPages={totalPages} onPageChange={this.onPageChange} />
        ) : (
          <Footer
            currentPage={currentPageRated}
            totalPages={ratedTotalPages}
            onPageChange={this.handleRatedPageChange}
          />
        )}
      </div>
    )
  }
}
