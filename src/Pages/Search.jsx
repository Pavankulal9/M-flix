import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Img_URL, fetchSearch } from "../utils/fetchApi";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Error from "./Error";
import PreLoadingImage from "../components/PreLoadingImage";
import Movie from "../components/Movie";
import withLoadingAndError from "../HOC/withLoadingAndError";
import useSelectMovie from "../hooks/useSelectMovie";

const Search = () => {
  const { selectedMovie, setSelectedMovie } = useSelectMovie();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  const {
    isFetching,
    isError: searchIsError,
    data: searchItem,
  } = useQuery({
    queryKey: [`${searchTerm}-${page}`],
    queryFn: () => fetchSearch(`${searchTerm}`, `${page}`),
    enabled: searchTerm.length === 0 ? false : true,
  });

  const nextPageHandler = useCallback(() => {
    const nextPage = page + 1;
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      next.set("page", String(nextPage));
      return next;
    });
  }, [setSearchParams, page]);

  const prevPageHandler = useCallback(() => {
    if (page < 1) {
      return;
    }
    const previousPage = page - 1;
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      next.set("page", String(previousPage));
    });
  }, [setSearchParams, page]);

  const isError = searchTerm.length > 0 && searchIsError;

  return (
    <SearchCompWithHandler
      isLoading={isFetching}
      isError={isError}
      searchItem={searchItem}
      searchTerm={searchTerm}
      setSelectedMovie={setSelectedMovie}
      selectedMovie={selectedMovie}
      prevPageHandler={prevPageHandler}
      nextPageHandler={nextPageHandler}
      page={page}
    />
  );
};

const SearchComponent = ({
  searchItem,
  searchTerm,
  setSelectedMovie,
  selectedMovie,
  prevPageHandler,
  nextPageHandler,
  page,
}) => {
  return (
    <section className="search">
      {searchTerm.length === 0 && <h2>Please enter the movie name</h2>}
      {searchItem === undefined && searchTerm.length > 0 && (
        <Error error={"Sever error Please try later"} />
      )}
      {searchItem !== undefined && (
        <>
          {searchItem[0] == null && searchTerm.length > 0 && page === 1 ? (
            <h2>Sorry '{searchTerm}' Movie Not Found!!!</h2>
          ) : (
            searchItem.map(
              (item) =>
                item.poster_path !== null && (
                  <div
                    className="searched-movie"
                    key={item.id}
                    onClick={() => setSelectedMovie(`${item.id}`)}
                  >
                    <div className="movie-poster">
                      <PreLoadingImage
                        src={`${Img_URL}${item.poster_path}`}
                        alt={`${item.title} Poster`}
                      />
                    </div>
                    <aside>
                      <h1>{item.title}</h1>
                      <p>{item.overview}</p>
                    </aside>
                  </div>
                ),
            )
          )}
          {searchItem[0] == null && page > 1 && (
            <h2>No More Content Available!!!</h2>
          )}
          {selectedMovie.length > 0 && <Movie id={selectedMovie} />}
          <div className="button">
            {page > 1 && (
              <button onClick={() => prevPageHandler()}>
                <FiArrowLeft />
                Prev
              </button>
            )}

            {searchItem.length > 19 && searchTerm.length > 0 && (
              <button onClick={() => nextPageHandler()}>
                Next
                <FiArrowRight />
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
};

const SearchCompWithHandler = withLoadingAndError(SearchComponent);

export default Search;
