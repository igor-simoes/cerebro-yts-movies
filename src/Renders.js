const React = require('react');
const Preview = require('./Preview');
const icon = require('./assets/logo-YTS.png');
const co = require('co');
const API = require('./api/yts');

/**
 * Render movies by page
 * 
 * @param  {String} entry
 * @param  {Function} options.display
 * @param  {Function} options.actions
 * @param  {Function} options.hide
 */
const movieByPage = co.wrap(function* (entry, display, actions, hide) {
    display({
        id: 'ymovie',
        icon: icon,
        title: `Searching movies in page ${entry[2]}`
    });

    let pageNumber = entry[1].match(/\d{1,3}/)[0]
    const data = yield API.fetchMoviesByPage(pageNumber);
    
    hide('ymovie');

    let rows = renderRow(data.movies);
    display(rows);
});

/**
 * Render movies by title
 * 
 * @param  {String} entry
 * @param  {Function} options.display
 * @param  {Function} options.actions
 * @param  {Function} options.hide
 */
const movieByTitle = co.wrap(function* (entry, display, actions, hide) {
    display({
      id: 'ymovie',
      icon: icon,
      title: `Searching... ${entry[1]} movie`
    })

    const data = yield API.fetchMovies(entry[1]);

    hide('ymovie');

    if (data.movie_count > 0) {
      let rows = renderRow(data.movies);
      display(rows);
    }
    else {
      movieNotFound(display);
    }
});

/**
 * Default template for display Movies not found
 *
 * @param  {Function} options.display
 */
const movieNotFound = (display) => {
  display({
    title: 'Movie Not Found',
    icon: icon,
    getPreview: () => <h1>Movie Not Found</h1>
  });
}

/**
 * Return rows for each movie in data
 *
 * @param  {Array} movies
 * @return {Array} results
 */
const renderRow = (movies) => {
    return movies.map( movie => ({
        title: movie.title_long,
        icon: icon,
        subtitle: movie.url,
        getPreview: () => <Preview movie={movie} />,
        onSelect: (event) => actions.open(movie.url)
    }));
}

module.exports = {
    movieByPage: movieByPage,
    movieByTitle: movieByTitle,
    icon: icon
}