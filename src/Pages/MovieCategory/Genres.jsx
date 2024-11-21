import React, { useState } from "react";
import { fetchGenresList, fetchGenres } from "../../utils/fetchApi";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import MoviesList from "../../components/MoviesList";
import Movie from "../../components/Movie";
import withLoadingAndError from "../../HOC/withLoadingAndError";
import useSelectMovie from "../../hooks/useSelectMovie";
import useFetchInView from "../../hooks/useFetchInView";

const Genres = () => {
  const {
    data: genre,
    isLoading: isGenreLoading,
    isError: isGenreError,
  } = useQuery({
    queryKey: ["genre"],
    queryFn: fetchGenresList,
  });

  const [genreId, setGenreId] = useState(28);

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

  const { selectedMovie } = useSelectMovie();
  const { ref: loadMoreRef } = useFetchInView(fetchNextPage);

  const selectGenreHandler = (e) => {
    setGenreId(+e.target.value);
  };

  const isLoading = isGenreLoading || status === "pending";
  const isError = status === "error" || isGenreError;

  return (
    <GenreCompWithHandler
      isLoading={isLoading}
      isError={isError}
      genre={genre}
      genreId={genreId}
      genresList={genresList}
      loadMoreRef={loadMoreRef}
      hasNextPage={hasNextPage}
      selectGenreHandler={selectGenreHandler}
      selectedMovie={selectedMovie}
    />
  );
};

const GenreComponent = ({
  genre,
  genreId,
  genresList,
  loadMoreRef,
  hasNextPage,
  selectGenreHandler,
  selectedMovie,
}) => {
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

const GenreCompWithHandler = withLoadingAndError(GenreComponent);

export default Genres;
