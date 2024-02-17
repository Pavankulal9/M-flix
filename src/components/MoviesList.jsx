import React, { useContext } from 'react';
import {Img_URL} from '../utils/fetchApi';
import PreLoadingImage from './PreLoadingImage';
import { MovieContext } from '../utils/context';

const MoviesList = ({MoviesListArray,loadMoreHandle=null,title,ClassName="MoviesList"}) => {

  const {setSelectedMovie}=useContext(MovieContext);
  return (
    <div className={ClassName}>
    <h1>{title}</h1>
    <div>
    {MoviesListArray?.map((item,index) => (
       item.poster_path!==null &&
        <div onClick={()=> setSelectedMovie(`${item.id}`)} className="card" key={index}>
          <PreLoadingImage src={`${Img_URL}${item.poster_path}`} alt={item.title}/>
        </div>
    ))}
    </div>
    {
      loadMoreHandle!==null&&
     <button onClick={loadMoreHandle}>More</button>
    }
  </div>
  )
}

export default MoviesList
