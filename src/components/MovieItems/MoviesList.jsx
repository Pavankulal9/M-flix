import React from 'react'
import { Link } from 'react-router-dom'
import '../MovieItems/moviesList.scss';

const MoviesList = ({MoviesListArray,loadMoreHandle,Img_URL}) => {
  return (
    <div className="MoviesList">
    <h1>Popular Movies</h1>
    <div>
    {MoviesListArray?.map((item,index) => (
       item.poster_path!==null &&
        <Link to={`/movie/${item.id}`} className="card" key={index}>
          <img src={`${Img_URL}${item.poster_path}`} alt="img" />
        </Link>
    ))}
    </div>
    <button onClick={loadMoreHandle}>More</button>
  </div>
  )
}

export default MoviesList
