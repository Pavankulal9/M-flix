import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Img_URL,fetchMovieList } from '../../utils/fetchApi';
import MoviesList from '../MovieItems/MoviesList';
const Popular = () => {

    const [page,setPage]=useState(1);
    const [popularMovieList,setPopularMovieList]=useState([])
   
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
    <MoviesList MoviesListArray={popularMovieList} Img_URL={Img_URL} loadMoreHandle={loadMoreHandle}/>
  )
}

export default Popular