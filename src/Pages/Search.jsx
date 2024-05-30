import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Img_URL, fetchSearch } from "../utils/fetchApi";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Loading from "./Loading";
import Error from "./Error";
import PreLoadingImage from "../components/PreLoadingImage";
import { MovieContext } from "../context/MovieContext";
import Movie from "../components/Movie";
import { SearchTermContext } from "../context/SearchContext";

const Search = () => {
  const { selectedMovie, setSelectedMovie } = useContext(MovieContext);
  const { searchTerm } = useContext(SearchTermContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
     setPage(1);
  }, [searchTerm]);

  const {
    isLoading,
    isError,
    data: searchItem,
  } = useQuery({
    queryKey: [`${searchTerm}-${page}`],
    queryFn: () => fetchSearch(`${searchTerm}`, `${page}`),
  });

  const nextPageHandler = () => {
    setPage((prev) => prev + 1);
  };

  const prevPageHandler = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return <Loading type={"text"} />;
  } else if (isError) {
    return <Error />;
  }

  return (
    <section className="search">
      {searchTerm.length === 0 && <h2>Please enter the movie name</h2>}
      {searchItem === undefined ? (
        <Error error={"Sever error Please try later"} />
      ) : (
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
                )
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

export default Search;
