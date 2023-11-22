import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Img_URL, fetchMovieDetails } from '../../utils/fetchApi'
import '../MovieItems/movie.scss'
import {toast} from 'react-toast'

const Movie = () => {

  const [favorite,setFavorite] = useState();

  useEffect(()=>{
    const isFavoriteMovie = JSON.parse(localStorage.getItem('Favorites'));
    if(isFavoriteMovie === null){
        return ;
    }else{
      return setFavorite(isFavoriteMovie);
    }
  },[])


  const {id} = useParams()
  const{isError,isLoading,error,data:Movie}= useQuery({
    queryKey: ['Movie',`${id}`],
    queryFn: ()=> fetchMovieDetails(`${id}`)
    .then((res)=>{
      return res.data;
    })
  });

  const addToFavoriteHandler = (movie)=>{
    const Movie = [movie];
    console.log(Movie);
   if(!favorite){
    setFavorite(Movie);
    localStorage.setItem('Favorites',JSON.stringify(Movie));
    toast.success('Movie added to favorites');
   }else{
    const isPresent = favorite.find((mov)=> mov.id === movie.id);
    if(isPresent){
      toast.warn('Movie already added in favorites!');
    }else{
      const addNewFavorites = [...favorite,movie];
      setFavorite(addNewFavorites);
      localStorage.setItem('Favorites',JSON.stringify(addNewFavorites));
      toast.success('Movie added to favorites');
    }
   }
  }

  console.log(favorite);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    );
  } else if (isError) {
    return (
      <div className="error">
        <p>{error.message}</p>
      </div>
    );
  }else
  return (
    <section className='movie' style={{backgroundImage:Movie.backdrop_path||Movie.backdrop_path===null?`linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(${`${Img_URL}${Movie.backdrop_path}`})`:'rgb(0,0,0)'}}>
      <div key={Movie.id}>
        <div>
         <h1>{Movie?.title}</h1>
         <h4>{Movie?.tagline}</h4>
        </div>
        <p>{Movie?.overview}</p>
        <p>Ratings: <span style={{color: Movie.vote_average > '7' ? 'gold':'red'}}>{Movie?.vote_average}</span>/10</p>
        <div>
        <p>Release Date: {Movie.release_date}</p>
        <p >Status: <span style={{color:Movie.status==='Released'?'greenyellow':'red'}}>{Movie?.status}</span></p>
        <button onClick={()=> addToFavoriteHandler(Movie)}>Add as favorite</button>
        </div>
      </div>
    </section>
  )
}

export default Movie;
