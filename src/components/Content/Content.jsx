import React from 'react'

import { GenresProvider } from '../GenresContext/GenresContext'
import SearchTab from '../SearchTab/SearchTab'
import RatedTab from '../RatedTab/RatedTab'
import Spinner from '../Spin/Spin'
import AlertMessage from '../AlertMessage/AlertMessage'

const Content = ({
  films,
  loading,
  error,
  activeTab,
  ratedMovies,
  currentPageRated,
  ratedTotalPages,
  guestSessionId,
  handleStarClick,
}) => {
  const hasData = !loading && !error

  if (loading) return <Spinner />
  if (error) return <AlertMessage message="Что-то пошло не так" description="Но скоро все исправится" type="error" />
  if (activeTab === 'search' && hasData) {
    if (films.length === 0)
      return <AlertMessage message="Нет результатов" description="Попробуйте изменить запрос" type="warning" />
    return (
      <GenresProvider>
        <SearchTab films={films} guestSessionId={guestSessionId} handleStarClick={handleStarClick} />
      </GenresProvider>
    )
  }
  if (activeTab === 'rated') {
    return (
      <GenresProvider>
        <RatedTab
          ratedMovies={ratedMovies}
          currentPageRated={currentPageRated}
          ratedTotalPages={ratedTotalPages}
          handleStarClick={handleStarClick}
        />
      </GenresProvider>
    )
  }
  return null
}

export default Content
