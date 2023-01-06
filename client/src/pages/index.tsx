import React, { Fragment, useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../config';
import MainImage from "../components/MainImage";
import GridCard from "../components/GridCards";
import { useAuthDispatch, useAuthState } from "../context/auth";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";

const Home = () => {
  
  const [Movies, setMovies] = useState([] as any);
  const [MainMovieImage, setMainMovieImage] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useAuthDispatch();

  const {user, authenticated } = useAuthState();

  console.log("MOVIES", [...Movies])
  useEffect(() => {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, [])
  const fetchMovies = (endpoint: any) => {
    fetch(endpoint)
    .then(res => res.json())
    .then(res => {
      setMovies([...Movies, ...res.results]);
      setMainMovieImage(res.results.slice(0, 3));
      setCurrentPage(res.page);
    }) 
  }

  const loadMoreItems = () => {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
    fetchMovies(endpoint);
  }

  const handleLogout = async() => {
    try {
      const res = await axios.post("/auth/logout")
      dispatch("LOGOUT", res.data?.user);
      Router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  }

  const handleRegister = () => {
    Router.push("/register");
  }

  const handleLogin = () => {
    Router.push("/login");
  }

  return (
    <Fragment>
        <div className="main-menu">
          <div id="main-logo">
            <a href="#top">HJ.movie</a>
          </div>
            {authenticated && user &&
            <Fragment>
              <div className="main-right">
                <a href={`/movie/user/${user?.username}`}>
                  <img 
                      src={user.ImageUrl}
                      alt="Profile-image" 
                      className="topSection-profile-image"
                  />
                </a>
                <span>{user.username}</span>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            </Fragment>}
            {!authenticated && 
              <Fragment>
                <div className="main-right">
                  <button onClick={handleRegister}>Register</button>
                  <button onClick={handleLogin}>Log in</button>
                </div>
              </Fragment>
            }
        </div>
      <div className="mainPage-img">
        {(MainMovieImage[0] && MainMovieImage[1] && MainMovieImage[2]) && <MainImage
            imageUrlOne={`${IMAGE_BASE_URL}w1280${MainMovieImage[0].backdrop_path}`} 
            imageUrlTwo={`${IMAGE_BASE_URL}w1280${MainMovieImage[1].backdrop_path}`} 
            imageUrlThree={`${IMAGE_BASE_URL}w1280${MainMovieImage[2].backdrop_path}`} 
            titleOne={MainMovieImage[0].original_title}
            titleTwo={MainMovieImage[1].original_title}
            titleThree={MainMovieImage[2].original_title}
            textOne={MainMovieImage[0].overview}
            textTwo={MainMovieImage[1].overview}
            textThree={MainMovieImage[2].overview}
            idOne={MainMovieImage[0].id}
            idTwo={MainMovieImage[1].id}
            idThree={MainMovieImage[2].id}
          />}
      </div>
      <h2 className="mainpage-desc">Movie By Latest</h2>
      {Movies && Movies.map((movie:any, index:number) => (
        <React.Fragment key={index}>
          <GridCard
            image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
            id={movie.id}
            name={movie.original_title}
          />
        </React.Fragment>
      ))}
      <div className="mainPage-btn">
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </Fragment>
  )
}

export default Home;