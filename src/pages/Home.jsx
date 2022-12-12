import React, { createContext, useState } from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'

export const HeroContext = createContext(null);

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);

  return (
    <>
      <HeroContext.Provider value={{heroMovie, setHeroMovie}}>
        <Main/>
        <Row title='Upcoming' movieArrayData={requests.requestUpcoming} />
        <Row title='Popular' movieArrayData={requests.requestPopular} />
        <Row title='Trending' movieArrayData={requests.requestTrending} />
        <Row title='Top Rated' movieArrayData={requests.requestTopRated} />
        <Row title='Horror' movieArrayData={requests.requestHorror} />
      </HeroContext.Provider>
    </>
  )
}

export default Home