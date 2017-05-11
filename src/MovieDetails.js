const React = require('react');
const styles = require('./styles.css');

module.exports = ({ movie }) => {
    let genres = movie.genres.map((genre) => genre).join(', ');
    let torrents = movie.torrents.map((torrent) => {
        return (
            <div key={torrent.hash} className={styles.divDownload}>
                <p>Quality: {torrent.quality}</p>
                <p>Size: {torrent.size}</p>
                <a href={torrent.url}>Download</a>
            </div>
        )
    });
    return (
        <div key={movie.id} className={styles.preview}>            
            <div className={styles.divImage}>
                <div className={styles.control}>
                    <img src={movie.medium_cover_image} className={styles.preview} />
                </div>
                <div>
                    <h2>Title: {movie.title}</h2>
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