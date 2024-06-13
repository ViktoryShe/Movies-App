import React, { useEffect, useState } from 'react'

import CardList from '../CardList/CardList'
import { fetchMovieDetails } from '../../utils/api'
import './RatedTab.css'

const RatedTab = ({ ratedMovies, handleStarClick, currentPageRated }) => {
  const [moviesWithDetails, setMoviesWithDetails] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
      const startIndex = (currentPageRated - 1) * 20
      const currentMovies = ratedMovies.slice(startIndex, startIndex + 20)

      const details = await Promise.all(
        currentMovies.map(async (movie) => {
          const movieDetails = await fetchMovieDetails(movie.movieId)
          return { ...movieDetails, rating: movie.rating }
        })
      )
      setMoviesWithDetails(details)
    }

    fetchDetails()
  }, [ratedMovies, currentPageRated])

  return (
    <div>
      {moviesWithDetails.length > 0 ? (
        <CardList films={moviesWithDetails} handleStarClick={handleStarClick} />
      ) : (
        <div className="no-rated-movies">No rated movies found.</div>
      )}
    </div>
  )
}

export default RatedTab
