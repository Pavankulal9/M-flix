import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "../utils/fetchApi";
import Movie from "../components/Movie";
import Banner from "../components/Banner";
import MoviesList from "../components/MoviesList";
import withLoadingAndError from "../HOC/withLoadingAndError";
import useSelectMovie from "../hooks/useSelectMovie";

const Home = () => {
  const { selectedMovie } = useSelectMovie();

  const {
    isError: isErrorPopular,
    data: Popular,
    isLoading: isLoadingPopular,
  } = useQuery({
    queryKey: ["Popular"],
    queryFn: () => fetchMovie("popular"),
    staleTime: 300000,
  });

  const {
    isError: isErrorUpcoming,
    data: upcoming,
    isLoading: isLoadingUpcoming,
  } = useQuery({
    queryKey: ["Upcoming"],
    queryFn: () => fetchMovie("upcoming"),
    staleTime: 300000,
  });

  const {
    isError: isErrorTopRated,
    data: TopRated,
    isLoading: isLoadingTopRated,
  } = useQuery({
    queryKey: ["TopRated"],
    queryFn: () => fetchMovie("top_rated"),
    staleTime: 300000,
  });

  const isLoading = isLoadingPopular && isLoadingUpcoming && isLoadingTopRated;
  const isError = isErrorPopular && isErrorTopRated && isErrorUpcoming;

  return (
    <HomeCompWithHandler
      isLoading={isLoading}
      isError={isError}
      Popular={Popular}
      selectedMovie={selectedMovie}
      TopRated={TopRated}
      upcoming={upcoming}
    />
  );
};

const HomeComponent = ({ Popular, selectedMovie, TopRated, upcoming }) => {
  return (
    <section className="home">
      {Popular && <Banner Popular={Popular.slice(0, 10)} />}
      {selectedMovie.length > 0 && <Movie id={selectedMovie} />}
      {Popular && TopRated && upcoming && (
        <>
          <MoviesList
            title={"TOP RATED"}
            MoviesListArray={TopRated}
            ClassName="MoviesListRow"
          />
          <MoviesList
            title={"POPULAR"}
            MoviesListArray={Popular}
            ClassName="MoviesListRow"
          />
          <MoviesList
            title={"UPCOMING"}
            MoviesListArray={upcoming}
            ClassName="MoviesListRow"
          />
        </>
      )}
    </section>
  );
};

const HomeCompWithHandler = withLoadingAndError(HomeComponent);

export default Home;
