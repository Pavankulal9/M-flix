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
      return prev + 1;
     });
   }
  
    const { isLoading,isError} = useQuery({
        queryKey: ["PopularList",`${page}`],
        queryFn: () =>
          fetchMovieList("popular",`${page}`).then((res) => {
            if(page===1){
              setPopularMovieList(res.results);
            }else{
              setPopularMovieList((prev)=> [...prev,...res.results]);
            }
            return res.results;
          }),
      });

     
      useEffect(()=>{
        return ()=>{
          setSelectedMovie("");
        }
      },[setSelectedMovie]);
      

      if (isLoading&&popularMovieList.length < 0) {
        return (
          <Loading type={'text'}/>
        );
      } else if (isError) {
        return (
          <Error />
        );
      } else
  return (
    <div className='movie-categorie'>
      {
          selectedMovie.length > 0 && 
         <Movie id={selectedMovie}/> 
        }
      <MoviesList MoviesListArray={popularMovieList} loadMoreHandle={loadMoreHandle} title={'Popular Movies'} />
    </div>
  )
}

export default Popular;