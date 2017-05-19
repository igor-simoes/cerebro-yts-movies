'use strict';
const co = require('co');
const Renders = require('./Renders');

/**
 * Cerebro plugin to find and download movies torrent from yts website
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 * @param  {Function} options.actions
 * @param  {Function} options.hide
 */
const plugin = co.wrap(function* plugin ({term, display, actions, hide}) {

  let entryPage = term.match(/^ymovie p\s\d{1,3}$/);
  let entry = term.match(/^ymovie\s(.+)/) || term.match(/(.+)\symovie$/);
  
  if (entryPage) {
    Renders.movieByPage(entry, display, actions, hide)
  }
  
  if (entry && !(entryPage)) {
    Renders.movieByTitle(entry, display, actions, hide)
  }
});

module.exports = {
  name: 'Search Torrent Movies to Download on YTS website',
  icon: Renders.icon,
  keyword: 'ymovie',
  fn: plugin
}
