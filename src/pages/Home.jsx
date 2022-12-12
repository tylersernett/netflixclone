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
        <Row setHeroMovie={setHeroMovie} title='Upcoming' movieArrayData={requests.requestUpcoming} />
        <Row setHeroMovie={setHeroMovie} title='Popular' movieArrayData={requests.requestPopular} />
        <Row setHeroMovie={setHeroMovie} title='Trending' movieArrayData={requests.requestTrending} />
        <Row setHeroMovie={setHeroMovie} title='Top Rated' movieArrayData={requests.requestTopRated} />
        <Row setHeroMovie={setHeroMovie} title='Horror' movieArrayData={requests.requestHorror} />
      </HeroContext.Provider>
    </>
  )
}

export default Home