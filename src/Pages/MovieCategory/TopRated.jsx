import React, { useContext, useEffect } from "react";
import { fetchMovieList } from "../../utils/fetchApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import MoviesList from "../../components/MoviesList";
import Loading from "../Loading";
import Error from "../Error";
import { MovieContext } from "../../context/MovieContext";
import Movie from "../../components/Movie";
import { useInView } from "react-intersection-observer";

const TopRated = () => {
  const { selectedMovie, setSelectedMovie } = useContext(MovieContext);
  const { ref: loadMoreRef, inView } = useInView();

  const {
    data: TopRated,
    status,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["TopratedList"],
    queryFn: ({ pageParam }) =>
      fetchMovieList({ category: "top_rated", pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    return () => {
      setSelectedMovie("");
    };
  }, [setSelectedMovie]);

  if (status === "pending") {
    return <Loading type={"text"} />;
  } else if (status === "error") {
    return <Error />;
  } else
    return (
      <div className="movie-categorie">
        {selectedMovie.length > 0 && <Movie id={selectedMovie} />}
        <MoviesList
          MoviesListArray={TopRated}
          loadMoreRef={loadMoreRef}
          title={"Top-Rated Movies"}
          hasNextPage={hasNextPage}
        />
      </div>
    );
};

export default TopRated;
