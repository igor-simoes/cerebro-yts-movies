'use strict';
const co = require('co');
const icon = require('./assets/logo-YTS.png');
const API = 'https://yts.ag/api/v2/list_movies.json?query_term=';
const React = require('react');
const Preview = require('./Preview');
const { memoize } = require('cerebro-tools');

const plugin = co.wrap(function* plugin ({term, display, actions, hide}) {
  
  let entry = term.match(/^ymovie\s(.+)/);
  entry = entry || term.match(/(.+)\symovie$/);
  if (entry) {
    let movies = '';
    
    display({
      id: 'ymovie',
      icon: icon,
      title: `Searching... ${entry[1]} movie`
    })
    
    const response = yield fetch(API + entry[1]);
    const finalResponse = yield response.json();    
    hide('ymovie');

    if (finalResponse.data.movie_count > 0) {
      const movies = finalResponse.data.movies;
      
      const results = movies.map( movie => ({
          title: movie.title_long,
          icon: icon,
          subtitle: movie.url,
          getPreview: () => <Preview movie={movie} />,
          onSelect: (event) => actions.open(movie.url)
      }));

      display(results);
    }
    else {
      display({
        title: 'Movie Not Found',
        icon: icon,
        getPreview: () => <h1>Movie Not Found</h1>
      });    
    }    
  };
})

module.exports = {
  name: 'Search Movies to Download on YTS website',
  icon: icon,
  keyword: 'ymovie',
  fn: plugin
}
