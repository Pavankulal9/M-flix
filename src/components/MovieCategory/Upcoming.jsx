import React, { useEffect, useState } from 'react'
import { Img_URL, fetchMovieList } from '../../utils/fetchApi';
import { useQuery } from '@tanstack/react-query';
import MoviesList from '../MovieItems/MoviesList';

const Upcoming = () => {
    const [page,setPage]=useState(1);
    const [UpcomingMovieList,setUpcomingMovieList]=useState([])
   
    const loadMoreHandle=()=>{
     setPage((prev)=> prev + 1);
     refetch();
     
         setUpcomingMovieList((prev)=> [...prev,...UpcomingList]);
         console.log(UpcomingList);
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
      },[refetch,page,isLoading]);
  
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
    <MoviesList MoviesListArray={UpcomingMovieList} Img_URL={Img_URL} loadMoreHandle={loadMoreHandle}/>
  )
  }
export default Upcoming;
