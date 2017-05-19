const co = require('co');
const API = 'https://yts.ag/api/v2/list_movies.json';

/**
 * Fetch movies by title from yts API
 *
 * @param  {Function} title
 * @return {JSON}
 */
const fetchMovies = co.wrap(function* (title) {
  let allMovies = API + `?query_term=${title}`;
  let response = yield fetch(allMovies);
  let finalResponse = yield response.json();
  return finalResponse.data;
});

/**
 * Fetch movies by page from yts API
 *
 * @param  {Function} pageNumber
 * @return {JSON}
 */
const fetchMoviesByPage = co.wrap(function* (pageNumber) {
  let moviesByPage = API + `?page=${pageNumber}`;
  let response = yield fetch(moviesByPage);
  let finalResponse = yield response.json();
  return finalResponse.data;
});

module.exports = {
    fetchMovies: fetchMovies,
    fetchMoviesByPage: fetchMoviesByPage
};