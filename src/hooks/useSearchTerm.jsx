import { useContext } from "react";
import { SearchTermContext } from "../context/SearchContext";

const useSearchTerm = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchTermContext);

  return { searchTerm, setSearchTerm };
};

export default useSearchTerm;
