import PropTypes from 'prop-types';
import React from 'react';

function Movie({poster_path, title, overview, genre_ids}){
    return (
        <div>
            <img src={'http://image.tmdb.org/t/p/'+poster_path} alt={title} />
            <h2>{title}</h2>
            <p>{overview}</p>
            <ul>{genre_ids.map((genre)=> (<li key={genre}>{genre}</li>))}</ul>
        </div>
    );
}
export default Movie;