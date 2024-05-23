import React, { useContext, useEffect, useState } from 'react'
import {fetchMovieList } from '../../utils/fetchApi';
import { useQuery } from '@tanstack/react-query';
import MoviesList from '../../components/MoviesList';
import Loading from '../Loading';
import Error from '../Error';
import { MovieContext } from '../../utils/context';
import Movie from '../../components/Movie';

const Upcoming = () => {
    const [page,setPage]=useState(1);
    const [UpcomingMovieList,setUpcomingMovieList]=useState([]);
    const {selectedMovie,setSelectedMovie}=useContext(MovieContext);
   
    const loadMoreHandle=()=>{
      setPage((prev)=> prev + 1);
   }
  
    const { isLoading,isError} = useQuery({
        queryKey: ["UpcomingList",`${page}`],
        queryFn: () =>
          fetchMovieList("upcoming",`${page}`).then((res) => {
              if(page===1){
                  setUpcomingMovieList(res.results);
              }else{
                 setUpcomingMovieList((prev)=> [...prev,...res.results]);
              }
              return res.results;
          }),
      });
  
     
      useEffect(()=>{
        return ()=>{
          setSelectedMovie("");
        }
      },[setSelectedMovie]);
  
      if (isLoading&&UpcomingMovieList.length < 0) {
        return (
          <Loading type={'text'}/>
        );
      } else if (isError) {
        return (
          <Error/>
        );
      } else
  return (
    <div className='movie-categorie'>
       {
          selectedMovie.length > 0 && 
         <Movie id={selectedMovie}/> 
        }
      <MoviesList MoviesListArray={UpcomingMovieList} loadMoreHandle={loadMoreHandle} title={'Upcoming Movies'}/>
    </div>
  )
  }
export default Upcoming;
