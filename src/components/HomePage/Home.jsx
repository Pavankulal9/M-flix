import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "../HomePage/home.scss";
import { fetchMovie } from "../../utils/fetchApi";
import { Img_URL } from "../../utils/fetchApi";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
 
 useEffect(()=>{

 },[])

 const navigation = useNavigate();
  const {
    isError,
    isLoading,
    error,
    data: upcoming,
  } = useQuery({
    queryKey: ["Movie", "Upcoming"],
    keepPreviousData: true,
    queryFn: () =>
    fetchMovie("upcoming").then((res) => {
      return res.results;
    }),
    
  });

  const { data: Toprated } = useQuery({
    queryKey: ["Movie", "Toprated"],
    keepPreviousData: true,
    queryFn: () =>
      fetchMovie("top_rated").then((res) => {
        return res.results;
      }),
  });

  const { data: Popular } = useQuery({
    queryKey: ["Movie", "Popular"],
    keepPreviousData: true,
    queryFn: () =>
      fetchMovie("popular").then((res) => {
        return res.results;
      }),
  });

  let Row;
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  } else if (isError) {
    return (
      <div className="error">
        <p>{error.message}</p>
      </div>
    );
  } else {
    Row = ({ title, arr = [] }) => {
      return (
        <div className="row">
          <h1>{title}</h1>
          <div>
          {arr.map((item) => (
              <Link to={`/movie/${item.id}`} className="card" key={item.title}>
                <img src={`${Img_URL}${item.poster_path}`} alt="img" />
              </Link>
          ))}
          </div>
        </div>
      );
    };
  }
  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: Popular
            && `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url(${`${Img_URL}${Popular[0]?.backdrop_path}`})`,
        }}>
        <div>
         {Popular[0] && <h1>{Popular[0]?.original_title}</h1>}
         <div>
          <button onClick={()=> navigation(`/movie/${Popular[0]?.id}`)}>More</button>
          </div>
          </div>
      </div>
      
        <Row title={"POPULAR"} arr={Popular} />
        <Row title={"TOP RATED"} arr={Toprated} />
        <Row title={"UPCOMING"} arr={upcoming} />
        
    </section>
  );
};

export default Home;

