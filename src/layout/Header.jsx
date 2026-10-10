import React, { useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import useSelectMovie from "../hooks/useSelectMovie";
import { debounce } from "../utils/helper";

const Header = () => {
  const { setSelectedMovie } = useSelectMovie();
  const [showNavBar, setShowNavBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const debouncedNavigate = useMemo(
    () =>
      debounce((text) => {
        if (!text) return;
        navigate(`/search?q=${encodeURIComponent(text)}&page=1`);
        setSelectedMovie("");
      }, 1500),
    [navigate, setSelectedMovie],
  );

  const handlerSearch = (e) => {
    let text = String(e.target.value).trimStart();
    setSearchText(text);
    debouncedNavigate(text);
  };

  const handleOnClick = () => {
    if (location.pathname !== "/search") {
      setSearchText("");
      navigate("/search");
      setSelectedMovie("");
    }
  };

  const handleOnBlur = () => {
    if (location.pathname !== "/search") {
      setSearchText("");
      setSelectedMovie("");
    }
  };

  return (
    <div className="header">
      <div
        className={showNavBar ? "NavBar-box-open" : "NavBar-box-close"}
        onClick={() => setShowNavBar(false)}
      >
        <ul className={"NavList"}>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "red" : "transparent",
            })}
            to={"/"}
            onClick={() => setShowNavBar(false)}
            about="Home_Page_URL"
          >
            Home
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "red" : "transparent",
            })}
            to={"/popular"}
            onClick={() => setShowNavBar(false)}
            about="Popular_Movies_Page_URL"
          >
            Popular
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "red" : "transparent",
            })}
            to={"/toprated"}
            onClick={() => setShowNavBar(false)}
            about="Toprated_Movies_Page_URL"
          >
            Top-Rated
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "red" : "transparent",
            })}
            to={"/genres"}
            onClick={() => setShowNavBar(false)}
            about="Genres_Page_URL"
          >
            Genres
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "red" : "transparent",
            })}
            to={"/upcoming"}
            onClick={() => setShowNavBar(false)}
            about="Upcoming_Movies_Page_URL"
          >
            Upcoming
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "red" : "transparent",
            })}
            to={"/favorites"}
            onClick={() => setShowNavBar(false)}
            about="MyFavorites_Movies_Page_URL"
          >
            {" "}
            My Favorites
          </NavLink>
        </ul>
      </div>
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
          onClick={handleOnClick}
          onBlur={handleOnBlur}
          value={searchText}
        />
      </div>
    </div>
  );
};

export default Header;
