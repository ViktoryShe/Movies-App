const API_KEY = 'df30e5514ef2cafab70d1eab9a6c21a4'
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return { results: [], total_results: 0 }
  }
}

export const fetchRandomMovies = async (page = 1) => {
  if (page > 100) {
    page = 100
  }

  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return { results: [], total_results: 0 }
  }
}

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    const data = await response.json()
    return data.genres
  } catch (error) {
    console.error('Error fetching genres:', error)
    return []
  }
}

export const createGuestSession = async () => {
  try {
    const response = await fetch(`${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`)
    const data = await response.json()
    return data.guest_session_id
  } catch (error) {
    console.error('Error creating guest session:', error)
    throw error
  }
}

export const rateMovie = async (movieId, rating, guestSessionId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: rating }),
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error rating movie:', error)
    throw error
  }
}

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return {}
  }
}
