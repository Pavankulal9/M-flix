import React, { useEffect, useState } from 'react';
import { Img_URL } from '../../utils/fetchApi';
import { Link } from 'react-router-dom';
import  '../MovieItems/moviesList.scss';

const Favorites = () => {
    const [FavoritesMovies,setFavoritesMovies]= useState([]);

    useEffect(()=>{
       setFavoritesMovies(JSON.parse(localStorage.getItem('Favorites')));
    },[]);

    console.log(FavoritesMovies);
  return (
    <div className="MoviesList">
    <h1>My Favorite List</h1>
    <div>
    {FavoritesMovies.length > 0&&FavoritesMovies.map((item,index) => (
       item.poster_path!==null &&
        <Link to={`/movie/${item.id}`} className="card" key={index}>
          <img src={`${Img_URL}${item.poster_path}`} alt="img" />
        </Link>
    ))}
    </div>
  </div>
  )
}

export default Favorites
