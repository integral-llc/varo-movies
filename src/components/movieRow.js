import React from 'react';
import './movieRow.css';
import classNames from 'classnames';

export default ({movie, favorite, onFavoriteClick}) => {

  return (
    <tr>
      <td>
        <img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} className='rounded'
          alt={movie.title}/>
      </td>
      <td>
        <h3>
          {movie.title}
          <span className={classNames('oi oi-heart favorite', {'selected': favorite})}
            onClick={onFavoriteClick}/>
          <br/>
          <small className='text-muted'>
            {movie.overview}
          </small>
        </h3>
        </td>
      <td>
        {movie.release_date}
      </td>
    </tr>
  )
}