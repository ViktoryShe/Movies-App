const API_KEY = 'df30e5514ef2cafab70d1eab9a6c21a4'
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}
