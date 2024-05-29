import React, { createContext, useState } from "react";

export const SearchTermContext = createContext();

const SearchTermProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchTermContext.Provider>
  );
};

export default SearchTermProvider;
