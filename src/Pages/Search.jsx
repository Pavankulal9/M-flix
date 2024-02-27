import React, { useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'
import { Img_URL, fetchSearch } from '../utils/fetchApi';
import {FiArrowRight,FiArrowLeft} from 'react-icons/fi'
import Loading from './Loading';
import Error from './Error';
import PreLoadingImage from '../components/PreLoadingImage';
import { MovieContext } from '../utils/context';
import Movie from '../components/Movie';

const Search = () => {
  const {selectedMovie,setSelectedMovie}=useContext(MovieContext);
  const {searchTerm} = useParams();
  const [page,setPage]= useState(1);
  const abortController = useRef(null);

  useEffect(()=>{
    setPage(1);
  },[searchTerm]);
  
  const {isLoading,isError,error,data:searchItem}=useQuery({
    queryKey:['searchItem',`${page}`,`${searchTerm}`],
    queryFn: ()=>
      fetchSearch(`${searchTerm}`,`${page}`,abortController)
      .then((res)=>{
          return res.results;
      })
    })
  

    const nextPageHandler =()=>{
        setPage((prev)=> prev+1);
    }
    
    const prevPageHandler =()=>{
      if(page > 1){
        setPage((prev)=> prev-1);
      }
    }
    
  if (isLoading) {
    return (
      <Loading type={'text'}/>
    );
  } else if (isError) {
    return (
     <Error error={error.message}/>
    );
  }

  return (
    <section className='search'>
      {

      searchItem === undefined?
      <Error error={'SeverError Please try later'}/>
      :
      <>
      {
          searchItem[0]==null&& page > 1 ? <h2>No More Content Available!!!</h2>: ""
       } 
       {
        searchItem[0]==null && page===1?<h2>Sorry '{searchTerm}' Not Found!!!</h2>:
        searchItem.map((item)=>(
         <div key={item.id} onClick={()=> setSelectedMovie(`${item.id}`)}>
          <div className='movie-poster'>
          { 
            item.poster_path && <PreLoadingImage src={ `${Img_URL}${item.poster_path}`} alt={`${item.title} Poster`}/>
          }
          </div>
          <aside>
          <h1>{item.title}</h1>
          <p>{item.overview}</p>
          </aside>
        </div>
        ))
      }
      {
        selectedMovie.length > 0 &&
        <Movie id={selectedMovie}/>
      }
      <span className='button'>
      {
        page > 1 && <button onClick={()=> prevPageHandler()}><FiArrowLeft/>Prev</button>
      }
      
      {
       searchItem[0]==null ?
        null
      : <button onClick={()=> nextPageHandler()}>Next<FiArrowRight/></button>
      }
      </span>
      </>
      }
      
    </section>
  )
    }
  
export default Search;

