import React, { createContext, useState, useEffect } from 'react'

import { fetchGenres } from '../../api/api'

const GenresContext = createContext()

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const getGenres = async () => {
      const fetchedGenres = await fetchGenres()
      setGenres(fetchedGenres)
    }

    getGenres()
  }, [])

  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
}

export default GenresContext
