import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchMovieList } from '../../utils/fetchApi';
import MoviesList from '../../components/MoviesList';
import Loading from '../Loading';
import Error from '../Error';
import { MovieContext } from '../../utils/context';
import Movie from '../../components/Movie';
const Popular = () => {

    const [page,setPage]=useState(1);
    const [popularMovieList,setPopularMovieList]=useState([]);
    const {selectedMovie,setSelectedMovie}=useContext(MovieContext);
   
    const loadMoreHandle=()=>{
     setPage((prev)=> {
      return prev += 1;
     });
     refetch();
     setPopularMovieList((prev)=> [...prev,...PopularList]);
   }
  
    const { isLoading,isError,error ,data: PopularList,refetch} = useQuery({
        queryKey: ["PopularList"],
        queryFn: () =>
          fetchMovieList("popular",`${page}`).then((res) => {
            if(page===1){
              setPopularMovieList(res.results);
              setPage(2);
            }
            return res.results;
          }),
      });

      useEffect(()=>{
       
      },[])

     
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
      <MoviesList MoviesListArray={popularMovieList} loadMoreHandle={loadMoreHandle} title={'Popular Movies'}/>
    </div>
  )
}

export default Popular