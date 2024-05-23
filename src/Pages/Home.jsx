import React, { useContext} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "../utils/fetchApi";
import Loading from "./Loading";
import Error from "./Error";
import { MovieContext } from "../utils/context";
import Movie from "../components/Movie";
import Banner from "../components/Banner";
import MoviesList from "../components/MoviesList";
const Home = () => {
  
  const {selectedMovie}=useContext(MovieContext);
  
  const {isError:isErrorPopular, data: Popular,isLoading:isLoadingPopular } = useQuery({
    queryKey: ["Movie", "Popular"],
    queryFn: () =>
      fetchMovie("popular").then((res) => {
        return res.results;
      }),
    staleTime: 60000
  });

  const {isError:isErrorUpcoming,data: upcoming,isLoading:isLoadingUpcoming} = useQuery({
    queryKey: ["Movie", "Upcoming"],
    queryFn: () =>
     fetchMovie("upcoming").then((res) => {
      return res.results;
    }),
    staleTime:  60000
  });

  const {isError:isErrorToprated, data: Toprated,isLoading:isLoadingToprated } = useQuery({
    queryKey: ["Movie", "Toprated"],
    queryFn: () =>
      fetchMovie("top_rated").then((res) => {
        return res.results;
      }),
    staleTime:  60000
  });


  if (isLoadingPopular && isLoadingUpcoming && isLoadingToprated) {
     return (
        <Loading type={'text'}/>
    );
  } else if (isErrorPopular && isErrorToprated && isErrorUpcoming) {
    return (
        <Error/>
    );
  }

  return (
    <section className="home">
      {
        Popular && <Banner Popular={Popular.slice(0,10)}/>
      }
      {
        selectedMovie.length > 0 && <Movie id={selectedMovie}/> 
      }
      {
      Popular && Toprated && upcoming &&
      <>
      <MoviesList title={"TOP RATED"} MoviesListArray={Toprated}   ClassName="MoviesListRow"/>
      <MoviesList title={"POPULAR"} MoviesListArray={Popular}  ClassName="MoviesListRow"/>
      <MoviesList title={"UPCOMING"} MoviesListArray={upcoming} ClassName="MoviesListRow"/>
      </>
      }
    </section>
  );
};

export default Home;

