import React, { useContext, useEffect, useState } from "react";
import { fetchGenresList, fetchGenres } from "../../utils/fetchApi";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import MoviesList from "../../components/MoviesList";
import Loading from "../Loading";
import Error from "../Error";
import { MovieContext } from "../../context/MovieContext";
import Movie from "../../components/Movie";
import { useInView } from "react-intersection-observer";

const Genres = () => {
  const [genreId, setGenreId] = useState(28);
  const { selectedMovie, setSelectedMovie } = useContext(MovieContext);
  const { ref: loadMoreRef, inView } = useInView();

  const {
    data: genre,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["genre"],
    queryFn: fetchGenresList,
  });

  const {
    data: genresList,
    status,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`genreList-${genreId}`],
    queryFn: ({ pageParam }) => fetchGenres({ genreId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  const selectGenreHandler = (e) => {
    setGenreId(+e.target.value);
  };

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

  if (isLoading || status === "pending") {
    return <Loading type={"text"} />;
  } else if (status === "error" || isError) {
    return <Error />;
  }
  return (
    <section className="genre-body">
      <div className="genre-container">
        <aside className="genre-list">
          {genre?.map((item) => (
            <button
              key={item.id}
              value={item.id}
              onClick={(e) => {
                selectGenreHandler(e);
              }}
              style={{ background: genreId === item.id ? "red" : "black" }}
            >
              {item.name}
            </button>
          ))}
        </aside>
        {
          <MoviesList
            title={"Select Genre"}
            MoviesListArray={genresList}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
          />
        }
      </div>
      {selectedMovie.length > 0 && <Movie id={selectedMovie} />}
    </section>
  );
};

export default Genres;
