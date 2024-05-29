import React, { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovieList } from "../../utils/fetchApi";
import MoviesList from "../../components/MoviesList";
import Loading from "../Loading";
import Error from "../Error";
import { MovieContext } from "../../context/MovieContext";
import Movie from "../../components/Movie";
import { useInView } from "react-intersection-observer";

const Popular = () => {
  const { selectedMovie, setSelectedMovie } = useContext(MovieContext);
  const { ref: loadMoreRef, inView } = useInView();

  const {
    data: Popular,
    status,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["PopularList"],
    queryFn: ({ pageParam }) =>
      fetchMovieList({ category: "popular", pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    return () => {
      setSelectedMovie("");
    };
  }, [setSelectedMovie]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "pending") {
    return <Loading type={"text"} />;
  } else if (status === "error") {
    return <Error />;
  }

  return (
    <div className="movie-categorie">
      {selectedMovie.length > 0 && <Movie id={selectedMovie} />}
      <MoviesList
        MoviesListArray={Popular}
        title={"Popular Movies"}
        loadMoreRef={loadMoreRef}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default Popular;
