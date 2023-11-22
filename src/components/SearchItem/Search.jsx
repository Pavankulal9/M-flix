import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Img_URL, fetchSearch } from '../../utils/fetchApi';
import '../SearchItem/search.scss';
import {FiArrowRight,FiArrowLeft} from 'react-icons/fi'

const Search = () => {
  const {searchTerm} = useParams();
  const navigate= useNavigate();
  const [page,setPage]= useState(1);

  const pageAddHandler =()=>{
      setPage((prev)=> prev+1);
      refetch();
  }
  
  const pageSubHandler =()=>{
    if(page > 1){
      setPage((prev)=> prev-1);
      refetch();
    }
  }
  
  const {isLoading,isError,error,data:searchItem,refetch}=useQuery({
      queryKey:['searchItem'],
      queryFn: ()=> fetchSearch(`${searchTerm}`,`${page}`)
      .then((res)=>{
        console.log(res);
        return res.results;
      }
        ),
    })
  
    useEffect(()=>{
      refetch();
    },[refetch,isLoading,searchTerm,page])


    
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    );
  } else if (isError) {
    return (
      <div className="error">
        <p>{error.message}</p>
      </div>
    );
  }else
  return (
    <section className='search'>
      {
          searchItem[0]==null&& page > 1 ? <h2>No More Content Available!!!</h2>: ""
       } 
       {
        searchItem[0]==null && page===1?<h2>Sorry '{searchTerm}' Not Found!!!</h2>:
        searchItem.map((item)=>(
         <div key={item.id} onClick={()=> navigate(`/movie/${item.id}`)}>
          { 
            item.poster_path && <img src={ `${Img_URL}${item.poster_path}`} alt="" />
          }
          <aside>
          <h1>{item.title}</h1>
          <p>{item.overview}</p>
          </aside>
        </div>
        ))
      }
  
      <span className='button'>
      {
        page > 1 && <button onClick={()=> pageSubHandler()}><FiArrowLeft/>Prev</button>
      }
      
      {
       searchItem[0]==null ?
      ''
      : <button onClick={()=> pageAddHandler()}>Next<FiArrowRight/></button>
      }
      </span>
      
    </section>
  )
    }
  
export default Search;

