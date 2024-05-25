import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchMovieList } from '../../utils/fetchApi';
import MoviesList from '../../components/MoviesList';
import Loading from '../Loading';
import Error from '../Error';
import { MovieContext } from '../../utils/context';
import Movie from '../../components/Movie';
import { useInView } from 'react-intersection-observer';

const Popular = () => {

    const [page,setPage]=useState(1);
    const [popularMovieList,setPopularMovieList]=useState([]);
    const {selectedMovie,setSelectedMovie}=useContext(MovieContext);
    const {ref:loadMoreRef,inView} = useInView();
  
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
      
      useEffect(()=>{
        if(inView){
          setPage((prev)=> prev + 1);
          console.log('working');
        }
      },[inView]);

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
      <MoviesList MoviesListArray={popularMovieList} title={'Popular Movies'} loadMoreRef={loadMoreRef} />
    </div>
  )
}

export default Popular;