const React = require('react');
const styles = require('./styles.css');
const trackers = [
    'http://track.one:1234/announce',
    'udp://track.two:80',
    'udp://tracker.opentrackr.org:1337/announce',
    'dp://tracker.coppersurfer.tk:6969',
    'dp://tracker.leechers-paradise.org:6969',
    'udp://p4p.arenabg.com:1337',
    'udp://tracker.internetwarriors.net:1337'
].map((track) => track).join('&tr=');

module.exports = ({ movie }) => {
    let displayName = movie.title;

    let torrents = movie.torrents.map((torrent) => {
        let hash = torrent.hash;
        let magnetLink = `magnet:?xt=urn:btih:${hash}&dn=${displayName}&tr=`+ trackers;
        return (
            <div key={hash} className={styles.divDownload}>
                <p>Quality: {torrent.quality}</p>
                <p>Size: {torrent.size}</p>
                <p><a href={torrent.url}>Download</a></p>
                <a href={magnetLink}>Magnet Link</a>
            </div>
        )
    });

    let genres = movie.genres.map((genre) => genre).join(', ');

    return (
        <div key={movie.id} className={styles.preview}>            
            <div className={styles.divImage}>
                <div className={styles.control}>
                    <img src={movie.medium_cover_image} className={styles.preview} />
                </div>
                <div>
                    <h2>Title: {displayName}</h2>
                    <h2>Year: {movie.year}</h2>
                    <h2>Genres: {genres}</h2>
                    <h2>Language: {movie.language}</h2>
                    <div>
                        <h2>Torrents:</h2>
                        <div className={styles.divTorrents}>
                            {torrents}
                        </div>
                    </div>
                    <div className={styles.divRow}>
                        <h2>Subtitles:</h2>
                        <a href={'http://www.yifysubtitles.com/movie-imdb/'+ movie.imdb_code}>YIFY Subtitles</a>
                    </div>
                    <div>
                        <h2>Summary:</h2>
                        <h3>{movie.summary}</h3>
                    </div>
                </div>
            </div>            
            
        </div>
    );
};