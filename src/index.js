'use strict';
const co = require('co');
const icon = require('./assets/logo-YTS.png');
const API = 'https://yts.ag/api/v2/list_movies.json?query_term=';
const React = require('react');
const MovieDetails = require('./MovieDetails');

const plugin = co.wrap(function* plugin ({term, display, actions, hide}) {

  let entry = term.match(/^yify\s(.+)/);
  entry = entry || term.match(/(.+)\syify$/);
  if (entry) {
    let movies = '';
    
    display({
      id: 'yify',
      icon: icon,
      title: `Searching... ${entry[1]} movie`
    })
    
    const response = yield fetch(API + entry[1]);
    const finalResponse = yield response.json();
    
    hide('yify');

    if (finalResponse.data.movie_count === 0) {
      display({
        title: 'Movie Not Found',
        icon: icon,
        getPreview: () => <h1>Movie Not Found</h1>
      })
    }

    finalResponse.data.movies.map(co.wrap(function* (movie) {
      return display({
        title: movie.long_title,
        icon: icon,
        subtitle: movie.url,
        getPreview: () => <MovieDetails movie={movie} />,
        onSelect: (event) => actions.open(movie.url)
      });
    
  }))
  };
})

module.exports = {
  name: 'Search Movies to Download on YTS website',
  icon: icon,
  keyword: 'yify',
  fn: plugin
}
