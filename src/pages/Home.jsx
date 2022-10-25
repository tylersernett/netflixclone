import React, { useState } from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);

  return (
    <>
      <Main heroMovie={heroMovie}/>
      <Row setHeroMovie={setHeroMovie} title='Upcoming' movieArrayData={requests.requestUpcoming} />
      <Row setHeroMovie={setHeroMovie} title='Popular' movieArrayData={requests.requestPopular} />
      <Row setHeroMovie={setHeroMovie} title='Upcoming' movieArrayData={requests.requestTrending} />
      <Row setHeroMovie={setHeroMovie} title='Top Rated' movieArrayData={requests.requestTopRated} />
      <Row setHeroMovie={setHeroMovie} title='Horror' movieArrayData={requests.requestHorror} />
    </>
  )
}

export default Home