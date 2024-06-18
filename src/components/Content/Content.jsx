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
  if (loading) return <Spinner />
  if (error) return <AlertMessage message="Что-то пошло не так" description="Попробуйте снова" type="error" />

  return (
    <GenresProvider>
      <div className="content">
        {activeTab === 'search' ? (
          <SearchTab films={films} handleStarClick={handleStarClick} />
        ) : (
          <RatedTab
            ratedMovies={ratedMovies}
            guestSessionId={guestSessionId}
            currentPageRated={currentPageRated}
            ratedTotalPages={ratedTotalPages}
            handleStarClick={handleStarClick}
          />
        )}
      </div>
    </GenresProvider>
  )
}

export default Content
