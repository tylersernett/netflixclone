import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'

const Home = () => {

  return (
    <>
        <Main/>
        <Row title='Upcoming' movieArrayData={requests.requestUpcoming} />
        <Row title='Popular' movieArrayData={requests.requestPopular} />
        <Row title='Trending' movieArrayData={requests.requestTrending} />
        <Row title='Top Rated' movieArrayData={requests.requestTopRated} />
        <Row title='Horror' movieArrayData={requests.requestHorror} />
    </>
  )
}

export default Home