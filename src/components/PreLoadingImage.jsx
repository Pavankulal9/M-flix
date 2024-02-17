import React, { useEffect, useState } from 'react'
import Loading from '../Pages/Loading';

const PreLoadingImage = ({src,alt}) => {
    const [ImageLoading,setImageLoading] = useState(true);

    useEffect(()=>{
      const image = new Image();
      image.onload = ()=>{
        setImageLoading(false);
      }
      image.src = src;

      return ()=>{setImageLoading(true)}
    },[src])
  return (
    <>
    {
        ImageLoading && 
         <Loading type={'spinner'}/>
    }
    {
        !ImageLoading && 
        <img src={src} alt={alt}/>
    }
    </>
  )
}

export default PreLoadingImage
