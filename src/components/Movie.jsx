import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Img_URL, fetchMovieDetails } from '../utils/fetchApi';
import {toast} from 'react-toast';
import Loading from '../Pages/Loading';
import Error from '../Pages/Error';
import {AiFillStar} from 'react-icons/ai';
import PreLoadingImage from './PreLoadingImage';
import { MovieContext } from '../utils/context';
import AddRemoveButton from './AddRemoveButton';

const Movie = ({id}) => {

  const [favourite,setFavourite] = useState([]);
  const {setSelectedMovie}=useContext(MovieContext);
  
  useEffect(()=>{
    const isFavoriteMovie = JSON.parse(localStorage.getItem('Favorites'));
    if(isFavoriteMovie === null){
        return ;
    }else{
      return setFavourite(isFavoriteMovie);
    }
  },[]);

  const{isError,isLoading,data:Movie}= useQuery({
    queryKey: ['Movie',`${id}`],
    queryFn: ()=> fetchMovieDetails(`${id}`)
    .then((res)=>{
      return res.data;
    })
  });

  const addToFavouriteHandler = (movie)=>{
    const Movie = [movie];
   if(!favourite){
    setFavourite(Movie);
    localStorage.setItem('Favorites',JSON.stringify(Movie));
    toast.success('Movie added to favorites');
   }else{
    const isPresent = favourite.find((mov)=> mov.id === movie.id);
    if(isPresent){
      toast.warn('Movie already added in favorites!');
    }else{
      const addNewFavorites = [...favourite,movie];
      setFavourite(addNewFavorites);
      localStorage.setItem('Favorites',JSON.stringify(addNewFavorites));
      toast.success('Movie added to favorites');
    }
   }
  }

  const removeFromFavourite=(movie)=>{
   const newList = favourite.filter((m)=> m.id !== movie.id);
   localStorage.setItem('Favorites',JSON.stringify(newList));
   toast.success('Movie removed from favorites');
  }
  
  return (
    <section className='movie' onClick={()=> setSelectedMovie("")}>
      {
        isLoading?
        <Loading  type={'text'}/>
        :isError?
        <Error/>
        :
     <div className='movie-box' style={{backgroundImage:Movie.backdrop_path||Movie.backdrop_path===null?`linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(${`${Img_URL}${Movie.backdrop_path}`})`:'rgb(0,0,0)'}}>
      <div key={Movie.id}>
      <div className='movie-poster'>
        <PreLoadingImage src={`${Img_URL}${Movie.poster_path}`} alt={`${Movie.title} image`}/>
      </div>
      <div className='movie-description'>
        <div  className='movie-title'>
          <h1>{Movie?.title}</h1>
          <h4>{Movie?.tagline}</h4>
        </div>
        <p>{Movie?.overview}</p>
        <p>Ratings: <span style={{color: Movie.vote_average > '7' ? 'gold':'red'}}>{Movie?.vote_average} <AiFillStar/></span></p>
        <div className='movie-details'>
          <div>
           <p>Release Date: <strong>{Movie.release_date}</strong></p>
           <p >Status: <span style={{color:Movie.status==='Released'?'greenyellow':'red'}}> {Movie?.status}</span></p>
          </div>
          <div className='button'>
           {
            favourite.length < 0?
            <button onClick={()=> addToFavouriteHandler(Movie)}>Add as favourite</button>
            :
            <AddRemoveButton favourite={favourite} movie={Movie} addToFavouriteHandler={addToFavouriteHandler} removeFromFavourite={removeFromFavourite}/>
           }
          </div>
        </div>
      </div>
      </div>
      </div>
      }
    </section>
  )
}

export default Movie;
