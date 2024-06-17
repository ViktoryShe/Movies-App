import React, { Component } from 'react'

import { fetchGenres } from '../../api/api'

const GenresContext = React.createContext()

export class GenresProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
    }
  }

  async componentDidMount() {
    const fetchedGenres = await fetchGenres()
    this.setState({ genres: fetchedGenres })
  }

  render() {
    const { genres } = this.state
    const { children } = this.props

    return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  }
}

export default GenresContext
