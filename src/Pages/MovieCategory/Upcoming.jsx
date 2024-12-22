import { fetchMovieList } from "../../utils/fetchApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import MoviesList from "../../components/MoviesList";
import Movie from "../../components/Movie";
import withLoadingAndError from "../../HOC/withLoadingAndError";
import useSelectMovie from "../../hooks/useSelectMovie";
import useFetchInView from "../../hooks/useFetchInView";

const Upcoming = () => {
  const {
    data: Upcoming,
    status,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["UpcomingList"],
    queryFn: ({ pageParam }) =>
      fetchMovieList({ category: "upcoming", pageParam }),
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
    <UpcomingCompWithHandler
      isError={isError}
      isLoading={isLoading}
      selectedMovie={selectedMovie}
      Upcoming={Upcoming}
      loadMoreRef={loadMoreRef}
      hasNextPage={hasNextPage}
    />
  );
};

const UpcomingComponent = ({
  selectedMovie,
  Upcoming,
  loadMoreRef,
  hasNextPage,
}) => {
  return (
    <div className="movie-categories">
      {selectedMovie.length > 0 && <Movie id={selectedMovie} />}
      <MoviesList
        MoviesListArray={Upcoming}
        loadMoreRef={loadMoreRef}
        title={"Upcoming Movies"}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

const UpcomingCompWithHandler = withLoadingAndError(UpcomingComponent);
export default Upcoming;
