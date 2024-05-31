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
