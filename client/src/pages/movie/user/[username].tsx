import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import { useAuthDispatch, useAuthState } from '../../../context/auth';
import Image from 'next/image';
import Profile from '../../../components/Profile';
import axios from 'axios';
import Router from 'next/router';
import GridCard from '../../../components/GridCards';
import useSWR from 'swr'
import { Favorite } from '../../../types';
import { IMAGE_BASE_URL } from '../../../config';
import { updateRestTypeNode } from 'typescript';

const UserPage = () => {
    const {authenticated, user} = useAuthState();
    const [FavoriteList, setFavoriteList] = useState([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {data: favorites} = useSWR<Favorite[]>(user ? `/user/${user.username}/favoriteList` : null);
    console.log("favorite", favorites);
    const dispatch = useAuthDispatch();
    console.log("user username", user);

    const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) return;
        const file = event.target.files[0];
        console.log("file", file);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", fileInputRef.current!.name);

        try {
            await axios.post(`/user/${user?.username}/upload`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            })
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const openFileInput = (type: string) => {
        const fileInput = fileInputRef.current;
        if (fileInput) {
            fileInput.name = type;
            fileInput.click();
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

    return (
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
            <div className="userProfile-container">
                <h1>User Profile</h1>
                <div className="userProfile">
                    <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage}/>
                        {user?.ImageUrl && (
                            <Image 
                            src={user.ImageUrl}
                            alt="Profile Image"
                            width={150}
                            height={150}
                            className="profile-image"
                            onClick={() => openFileInput("image")}
                            priority={true}
                            />)}
                    <div className="user-info">
                        {user && 
                            <Fragment>
                                <h1>{user.username}</h1>
                                <h2>Registered: {new Date(user.createdAt).toLocaleString()}</h2>
                                <h3>Email: {user.email}</h3>
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
            <div className="userFav-container">
                <h2>Liked Movies</h2>
                {favorites && favorites.map((movie) => (
                    <React.Fragment key={movie.movieId}>
                    <GridCard
                        image={movie.posterPath ? `${IMAGE_BASE_URL}w500${movie.posterPath}` : null}
                        id={Number(movie.movieId)}
                        name={movie.movieTitle}
                    />
                    </React.Fragment>
                ))}
            </div>
        </Fragment>
    )
}

export default UserPage;