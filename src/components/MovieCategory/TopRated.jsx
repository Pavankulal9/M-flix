import React, { useEffect, useState } from 'react'
import { Img_URL,fetchMovieList } from '../../utils/fetchApi';
import { useQuery } from '@tanstack/react-query';
import MoviesList from '../MovieItems/MoviesList';

const TopRated = () => {
  const [page,setPage]=useState(1);
  const [TopRatedMovieList,setTopRatedMovieList]=useState([])
 
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
    },[refetch,page]);

    if (isLoading) {
      return (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      );
    } else if (isError) {
      return (
        <div className="error">
          <p>{error.message}</p>
        </div>
      );
    } else
return (
 <MoviesList MoviesListArray={TopRatedMovieList} Img_URL={Img_URL} loadMoreHandle={loadMoreHandle}/>
)
}

export default TopRated