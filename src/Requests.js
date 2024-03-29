const key = process.env.REACT_APP_THEMOVIEDB_API_KEY

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestAnimation: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&with_genres=16&language=en-US&page=1`,
    requestHorror: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&with_genres=27&language=en-US&page=1`,
    // requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
}

export default requests