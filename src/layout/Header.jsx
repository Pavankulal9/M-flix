import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { FaHamburger } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import useSelectMovie from "../hooks/useSelectMovie";
import useSearchTerm from "../hooks/useSearchTerm";
import { useDebounce } from "../hooks/useDebounce";

const Header = () => {
  const { setSelectedMovie } = useSelectMovie();
  const { setSearchTerm } = useSearchTerm();
  const [showNavBar, setShowNavBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debounceData = useDebounce(searchText, 2000);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchTerm(debounceData);
  }, [debounceData, setSearchTerm]);

  const handlerSearch = (e) => {
    let text = e.target.value;
    setSearchText(text);
  };

  const handleNavigate = () => {
    if (location.pathname !== "/search") {
      setSearchTerm("");
      setSearchText("");
      navigate("/search");
      setSelectedMovie("");
    }
  };

  const handleOnClick = () => {
    if (location.pathname !== "/search") {
      setSearchTerm("");
      setSearchText("");
      setSelectedMovie("");
    }
  };

  return (
    <div className="header">
      <ul className={showNavBar ? "NavBar-Open" : "NavBar-Close"}>
        <li>
          <FiX onClick={() => setShowNavBar(false)} />
        </li>
        <Link
          to={"/"}
          onClick={() => setShowNavBar(false)}
          about="Home_Page_URL"
        >
          Home
        </Link>
        <Link
          to={"/popular"}
          onClick={() => setShowNavBar(false)}
          about="Popular_Movies_Page_URL"
        >
          Popular
        </Link>
        <Link
          to={"/toprated"}
          onClick={() => setShowNavBar(false)}
          about="Toprated_Movies_Page_URL"
        >
          Toprated
        </Link>
        <Link
          to={"/genres"}
          onClick={() => setShowNavBar(false)}
          about="Genres_Page_URL"
        >
          Genres
        </Link>
        <Link
          to={"/upcoming"}
          onClick={() => setShowNavBar(false)}
          about="Upcoming_Movies_Page_URL"
        >
          Upcoming
        </Link>
        <Link
          to={"/favorites"}
          onClick={() => setShowNavBar(false)}
          about="MyFavorites_Movies_Page_URL"
        >
          {" "}
          My Favorites
        </Link>
      </ul>
      <div>
        <FaHamburger onClick={() => setShowNavBar(true)} />
        <Link to={"/"} about="Home_Page_URL">
          <h1>M-Flix</h1>
        </Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          onChange={handlerSearch}
          onClick={handleNavigate}
          onBlur={handleOnClick}
          value={searchText}
        />
        <button type="submit">
          <BiSearch />
        </button>
      </div>
    </div>
  );
};

export default Header;
