import React, { useState } from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);

  return (
    <>
      <Main heroMovie={heroMovie}/>
      <Row setHeroMovie={setHeroMovie} title='Upcoming' fetchURL={requests.requestUpcoming} />
      <Row setHeroMovie={setHeroMovie} title='Popular' fetchURL={requests.requestPopular} />
      <Row setHeroMovie={setHeroMovie} title='Upcoming' fetchURL={requests.requestTrending} />
      <Row setHeroMovie={setHeroMovie} title='Top Rated' fetchURL={requests.requestTopRated} />
      <Row setHeroMovie={setHeroMovie} title='Horror' fetchURL={requests.requestHorror} />
    </>
  )
}

export default Home