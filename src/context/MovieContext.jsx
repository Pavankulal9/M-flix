import React, { useState } from 'react'
import { createContext } from 'react'
 export const MovieContext = new createContext();

const MovieProvider = ({children}) => {
    const [selectedMovie,setSelectedMovie]= useState("");

  return (
    <MovieContext.Provider value={{selectedMovie,setSelectedMovie}}>{children}</MovieContext.Provider>
  )
}

export default MovieProvider
