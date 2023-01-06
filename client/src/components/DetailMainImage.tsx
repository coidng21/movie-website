import React, { Fragment } from "react";
import { FcLike, FcMoneyTransfer } from "react-icons/fc";
import Link from "next/link";
import { User } from "../types";
import Favorite from "../pages/movie/Favorite";
import FavoriteComponent from "../pages/movie/Favorite";

interface DetailMainImageProps {
    className?: string;
    imageUrl?: string;
    postUrl?: string;
    title: string;
    text?: string;
    movie?: any;
    genres?: [{id:number, name:string}];
    user?: User;
    Liked: boolean;
    InitialLike: boolean;
    onClickLike: () => void;
}

const DetailMainImage:React.FC<DetailMainImageProps> = ({
    className = "",
    imageUrl = "",
    postUrl = "",
    title,
    text = "",
    movie,
    genres,
    user,
    Liked,
    onClickLike,
    InitialLike,
}) => {
    return (
        <Fragment>
            <div className="detailPage-container">
                <div className="detailPage-mainImage">
                    <img src={imageUrl} alt="Movie Image"/>
                        <div className="detailPage-poster">
                            <img src={postUrl} alt="poster Image"/>
                        </div>
                        <div className="detailPage-text">
                            <h1>{title}</h1>
                            <div className="detail-favorite">
                                <div className="detail-btn">
                                    <FavoriteComponent
                                    movieId={movie.id}
                                    user={user}
                                    movieTitle={title}
                                    Liked={Liked}
                                    onClickLike={onClickLike}
                                    InitialLike={InitialLike}
                                    />
                                </div>
                            </div>
                            <h3><span>Release Date: </span>{movie.release_date}</h3>
                            <h3>Genres: {genres?.map(genre => 
                                    <span key={genre.id}>
                                        <span className="genre">{genre.name} </span>
                                    </span>
                                )}</h3>
                            <h3>Runtime: {movie.runtime}</h3>
                            <h2>Summary<br/><hr/>{text}</h2>
                            <div className="detailPage-info">
                                <div><FcLike/> Popularity: {movie.popularity}</div>
                                <div><FcMoneyTransfer/> Revenue: {movie.revenue}</div>
                            </div>
                        </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DetailMainImage;