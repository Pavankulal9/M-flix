import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovieList } from "../../utils/fetchApi";
import MoviesList from "../../components/MoviesList";
import Movie from "../../components/Movie";
import withLoadingAndError from "../../HOC/withLoadingAndError";
import useSelectMovie from "../../hooks/useSelectMovie";
import useFetchInView from "../../hooks/useFetchInView";

const Popular = () => {
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

  const { selectedMovie } = useSelectMovie();
  const { ref: loadMoreRef } = useFetchInView(fetchNextPage);

  const isLoading = status === "pending";
  const isError = status === "error";

  return (
    <PopularCompWithHandler
      isLoading={isLoading}
      isError={isError}
      selectedMovie={selectedMovie}
      Popular={Popular}
      loadMoreRef={loadMoreRef}
      hasNextPage={hasNextPage}
    />
  );
};

const PopularComponent = ({
  selectedMovie,
  Popular,
  loadMoreRef,
  hasNextPage,
}) => {
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

const PopularCompWithHandler = withLoadingAndError(PopularComponent);

export default Popular;
