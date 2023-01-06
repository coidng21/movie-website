import React, { FormEvent, Fragment, use, useCallback, useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../config';
import Router, { useRouter } from "next/router";
import MainImage from "../../components/MainImage";
import DetailMainImage from "../../components/DetailMainImage";
import GridCard from "../../components/GridCards";
import CastGridCard from "../../components/CastGridCard";
import { Comment, Favorite } from "../../types";
import useSWR from 'swr';
import CommentInput from "../../components/CommentInput";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import CommentBox from "../../components/CommentBox";
import Image from "next/image";
import Link from "next/link";
import FavoriteComponent from "./Favorite";
import LoadingPage from "../../components/Loading";

const Movie = () => {

    const [Movie, setMovie] = useState([] as any);
    const [Cast, setCast] = useState<{index:number; profile_path:string; character: string, name: string}[]>([] as any);
    const [ActorToggle, setActorToggle] = useState(false);
    const [CommentToggle, setCommentToggle] = useState(true);
    const [AddComment, setAddComment] = useState(true);
    const [Liked, setLiked] = useState(false);
    const [InitialLike, setInitialLike] = useState(false);

    const [errorMovieFetchedChecker, setErrorMovieFetchedChecker] = useState(false);
    const [comment, setComment] = useState("");
    const dispatch = useAuthDispatch();

    const {authenticated, user} = useAuthState();
    
    const router = useRouter();
    let {movieId} = router.query;
    const {data: comments, mutate: commentMutate} = useSWR<Comment[]>( movieId ? `/movie/${movieId}/comments` : null);
    const {data: fav } = useSWR<Favorite>(movieId && user ?`/favorite/${movieId}/${user.username}/favorited` : null);
    let initialLike = false;
    if (fav) {
        initialLike = fav.result;
    }
    console.log("FAVV", fav);
    console.log("Comments", comments);

    const movieTitle = Movie.original_title;
    const posterPath = Movie.poster_path;

    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    useEffect(() => {

        const fetchEndpointInfo = async() => {
            const info = await fetch(endpointInfo)
                        .then(res => res.json())
                        .then(res => setMovie(res));
        }

        if (!errorMovieFetchedChecker || !Movie || !Movie.success) {
            fetchEndpointInfo()
            .then(() => setErrorMovieFetchedChecker((c) => !c));
        }

        const fetchEndpointCast = async() => {
            const info = await fetch(endpointCrew)
                        .then(res => res.json())
                        .then(res => setCast(res.cast));
        }

        fetchEndpointCast()
        .catch(console.error);

        setInitialLike(initialLike);
        setLiked(initialLike);

    }, [errorMovieFetchedChecker]);

    let variables = {
        movieId,
        user,
        movieTitle,
        posterPath,
    }
    
    console.log("client add fav user", user);

    const onClickLike = () => {

        if (!authenticated) {
            router.push("/login");
            return;
        }

        if (Liked) {
            axios.post(`/favorite/removeFavorite`, {variables})
            .then(res => {
                if(res.data.success) {
                    setLiked(!Liked);
                    setInitialLike(false);
                } else if (!res.data.success) {
                    alert("The movie is already in Favorite List");
                }
            })
        } else {
            axios.post(`/favorite/addToFavorite`, {variables})
            .then(res => {
                if (res.data.success) {
                    setLiked(!Liked);
                } else if (res.data.message) {
                    alert("The Movie is Already in Favorite List");
                }
            })
        }
    }

    const ToggleActorView = () => {
        setActorToggle(!ActorToggle);
    }

    const HandleAddCommentBtn = () => {
        setAddComment(!AddComment);
    }

    const HandleCommentToggle = () => {
        setCommentToggle(!CommentToggle);
    }

    const handleSubmit = async(event: FormEvent) => {
        event.preventDefault();
        if (!authenticated) {
            router.push("/login");
        }
        if (comment.trim() === "") {
            return;
        }
        try {
            await axios.post(`/movie/${movieId}/comments`, {
                user: user,
                body: comment,
            })
            commentMutate();
            setComment("");
        } catch(error) {
            console.log(error);
        }
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

    console.log("Movie", Movie);

     return (
        <Fragment>
        {!Movie.success && <LoadingPage/>}
        {!Movie.hasOwnProperty("success") &&
        <Fragment>
        <div className="main-menu">
          <div id="main-logo">
            <a href={`/`}>HJ.movie</a>
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
            <div className="detail-mainImg">
                {Movie && <DetailMainImage
                    imageUrl={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                    title={Movie.original_title}
                    text={Movie.overview}
                    postUrl={`${IMAGE_BASE_URL}w500${Movie.poster_path}`}
                    movie={Movie}
                    genres={Movie.genres}
                    user={user}
                    Liked={Liked}
                    onClickLike={onClickLike}
                    InitialLike={InitialLike}
                />}
            </div>
            <h4 className="detail-desc">ACTORS
                <div className="detail-btn">
                    {!ActorToggle && <button onClick={ToggleActorView}>Click to Open Actor List</button>}
                </div>
            </h4>
            <div className="castGrid-container">
                {ActorToggle && Cast && Cast.map((actor, index) => (
                    <React.Fragment key={index}>
                        <CastGridCard
                            imageUrl={actor.profile_path ? 
                                `${IMAGE_BASE_URL}w500${actor.profile_path}` 
                                : `http://www.gravatar.com/avatar/?d=mp`}
                            characterName={actor.character}
                            actorName={actor.name}
                        />
                    </React.Fragment>
                ))
                }
            </div>
            <div className="detail-close-btn">
                {ActorToggle && <button onClick={ToggleActorView}>Click to Close Actor List</button>}
            </div>
            <hr/>
            <div className="comment-container">
                <h5>Add Comments
                    {AddComment &&
                    <span className="comment-btn">
                        <br/> <button className="detail-btn" onClick={HandleAddCommentBtn}>Add Comment</button>
                    </span>}
                </h5>
                {!AddComment && 
                <form onSubmit={handleSubmit}>
                    <CommentInput
                    placeholder='Write your comment here...'
                    value={comment}
                    setValue={setComment}
                    />
                    <div className="comment-btn">
                        <button>Submit</button>
                        <button onClick={HandleAddCommentBtn}>Cancel</button>
                    </div>
                </form>}
            </div>
            <div className="display-comment">
                <h6>Comments
                    {!CommentToggle &&
                        <span className="comment-btn">
                            <br/> <button className="detail-btn" onClick={HandleCommentToggle}>View Comment</button>
                        </span>}
                 </h6>
                {comments && CommentToggle && comments.map((comment) => (
                    <React.Fragment key={comment.identifier}>
                        <CommentBox
                            comment={comment.body}
                            username={comment.username}
                            createdDate={new Date(comment.createdAt).toLocaleString()}
                            // imageUrl={comment.user?.ImageUrl}
                        />
                    </React.Fragment>
                ))}
                {CommentToggle && 
                    <div className="detail-close-btn">
                        <button onClick={HandleCommentToggle}>Close Comment</button>
                    </div>}
            </div>
            </Fragment>}
        </Fragment>
    )
}

export default Movie;
