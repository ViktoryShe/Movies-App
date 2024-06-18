import React, { useEffect, useState } from 'react'

import CardList from '../CardList/CardList'
import { fetchMovieDetails } from '../../api/api'
import './RatedTab.css'
import AlertMessage from '../AlertMessage/AlertMessage'

const RatedTab = ({ ratedMovies, handleStarClick, currentPageRated }) => {
  const [moviesWithDetails, setMoviesWithDetails] = useState([])
  const [cachedDetails, setCachedDetails] = useState({})

  useEffect(() => {
    const fetchDetails = async () => {
      const startIndex = (currentPageRated - 1) * 20
      const currentMovies = ratedMovies.slice(startIndex, startIndex + 20)

      const detailsPromises = currentMovies.map(async (movie) => {
        if (cachedDetails[movie.movieId]) {
          return { ...cachedDetails[movie.movieId], rating: movie.rating }
        }
        const movieDetails = await fetchMovieDetails(movie.movieId)
        setCachedDetails((prevCache) => ({
          ...prevCache,
          [movie.movieId]: movieDetails,
        }))
        return { ...movieDetails, rating: movie.rating }
      })

      const details = await Promise.all(detailsPromises)
      setMoviesWithDetails(details)
    }

    fetchDetails()
  }, [ratedMovies, currentPageRated, cachedDetails])

  return (
    <div>
      {moviesWithDetails.length > 0 ? (
        <CardList films={moviesWithDetails} handleStarClick={handleStarClick} />
      ) : (
        <AlertMessage message="Нет результатов" description="Оцените фильм" type="warning" />
      )}
    </div>
  )
}

export default RatedTab
