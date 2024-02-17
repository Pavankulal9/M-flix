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
     refetch();
     setUpcomingMovieList((prev)=> [...prev,...UpcomingList]);
   }
  
    const { isLoading,isError,error ,data: UpcomingList,refetch} = useQuery({
        queryKey: ["UpcomingList"],
        queryFn: () =>
          fetchMovieList("upcoming",`${page}`).then((res) => {
              if(page===1){
                  setUpcomingMovieList(res.results);
                  setPage(2);
              }
            return res.results;
          }),
      });
  
     
      useEffect(()=>{
        refetch();
        return ()=>{
          setSelectedMovie("");
        }
      },[refetch,page,setSelectedMovie]);
  
      if (isLoading) {
        return (
          <Loading type={'text'}/>
        );
      } else if (isError) {
        return (
          <Error error={error.message}/>
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
