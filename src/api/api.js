const API_KEY = 'df30e5514ef2cafab70d1eab9a6c21a4'
const BASE_URL = 'https://api.themoviedb.org/3'

const checkStatus = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export const fetchMovies = async (query, page = 1) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
  const data = await checkStatus(response)
  return data
}

export const fetchRandomMovies = async (page = 1) => {
  if (page > 100) {
    page = 100
  }

  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
  const data = await checkStatus(response)
  return data
}

export const fetchGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
  const data = await checkStatus(response)
  return data.genres
}

export const createGuestSession = async () => {
  const response = await fetch(`${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`)
  const data = await checkStatus(response)
  return data.guest_session_id
}

export const rateMovie = async (movieId, rating, guestSessionId) => {
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
  const data = await checkStatus(response)
  return data
}

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
  const data = await checkStatus(response)
  return data
}
