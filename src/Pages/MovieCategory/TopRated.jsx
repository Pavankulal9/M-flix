import React, { useContext, useEffect, useState } from 'react'
import { fetchMovieList } from '../../utils/fetchApi';
import { useQuery } from '@tanstack/react-query';
import MoviesList from '../../components/MoviesList';
import Loading from '../Loading';
import Error from '../Error';
import { MovieContext } from '../../utils/context';
import Movie from '../../components/Movie';

const TopRated = () => {
  const [page,setPage]=useState(1);
  const [TopRatedMovieList,setTopRatedMovieList]=useState([]);
  const {selectedMovie,setSelectedMovie}=useContext(MovieContext);
 
  const loadMoreHandle=()=>{
   setPage((prev)=> prev + 1);
   refetch();
   setTopRatedMovieList((prev)=> [...prev,...TopratedList]);
 }

  const { isLoading,isError,error ,data: TopratedList,refetch} = useQuery({
      queryKey: ["TopratedList"],
      queryFn: () =>
        fetchMovieList("top_rated",`${page}`).then((res) => {
            if(page===1){
                setTopRatedMovieList(res.results);
                setPage(2);
            }
            return  res.results;
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
    <MoviesList MoviesListArray={TopRatedMovieList} loadMoreHandle={loadMoreHandle} title={'Top-Rated Movies'}/>
  </div>
)
}

export default TopRated