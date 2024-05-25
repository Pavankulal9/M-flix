import React, { useContext, useEffect, useState } from 'react'
import { fetchMovieList } from '../../utils/fetchApi';
import { useQuery } from '@tanstack/react-query';
import MoviesList from '../../components/MoviesList';
import Loading from '../Loading';
import Error from '../Error';
import { MovieContext } from '../../utils/context';
import Movie from '../../components/Movie';
import { useInView } from 'react-intersection-observer';

const TopRated = () => {
  const [page,setPage]=useState(1);
  const [TopRatedMovieList,setTopRatedMovieList]=useState([]);
  const {selectedMovie,setSelectedMovie}=useContext(MovieContext);
  const {ref:loadMoreRef,inView} = useInView();

  const { isLoading,isError} = useQuery({
      queryKey: ["TopratedList",`${page}`],
      queryFn: () =>
        fetchMovieList("top_rated",`${page}`).then((res) => {
            if(page===1){
                setTopRatedMovieList(res.results);
            }else{
              setTopRatedMovieList((prev)=> [...prev,...res.results]);
            }
            return  res.results;
        }),
    });

   useEffect(()=>{
        if(inView){
          setPage((prev)=> prev + 1);
        }
    },[inView]);

    useEffect(()=>{
      return ()=>{
        setSelectedMovie("");
      }
    },[setSelectedMovie]);
    

    if (isLoading&&TopRatedMovieList.length < 0) {
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
    <MoviesList MoviesListArray={TopRatedMovieList} loadMoreRef={loadMoreRef} title={'Top-Rated Movies'}/>
  </div>
)
}

export default TopRated