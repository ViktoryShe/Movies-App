import React, { useEffect, useState } from 'react'

import CardList from '../CardList/CardList'
import { fetchMovieDetails } from '../../utils/api'

const RatedTab = ({ ratedMovies, handleStarClick }) => {
  const [moviesWithDetails, setMoviesWithDetails] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await Promise.all(
        ratedMovies.map(async (movie) => {
          const movieDetails = await fetchMovieDetails(movie.movieId)
          return { ...movieDetails, rating: movie.rating }
        })
      )
      setMoviesWithDetails(details)
    }

    fetchDetails()
  }, [ratedMovies])

  return (
    <div>
      {moviesWithDetails.length > 0 ? (
        <CardList films={moviesWithDetails} handleStarClick={handleStarClick} />
      ) : (
        <div>No rated movies found.</div>
      )}
    </div>
  )
}

export default RatedTab
