import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

const useSelectMovie = () => {
  const { selectedMovie, setSelectedMovie } = useContext(MovieContext);

  return { selectedMovie, setSelectedMovie };
};

export default useSelectMovie;
