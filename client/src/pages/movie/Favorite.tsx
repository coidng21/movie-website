import React, {useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { User } from '../../types';
import {MdFavorite} from 'react-icons/md'

interface FavoriteComponentProps {
    movieId: number;
    user?: User;
    movieTitle?: string;
    Liked: boolean;
    onClickLike: () => void;
    InitialLike: boolean;
}

const FavoriteComponent:React.FC<FavoriteComponentProps> = ({
    movieId,
    user,
    movieTitle = "",
    Liked,
    onClickLike,
    InitialLike
}) => {

    return (
        <div>
            {(Liked || InitialLike) && <button onClick={onClickLike} style={{display: 'flex'}}>
                <MdFavorite/>&nbsp;&nbsp; Remove Favorite  
            </button>}
            {(!Liked) && <button onClick={onClickLike} style={{display: 'flex'}}>
                &nbsp;&nbsp; Add to Favorite  
            </button>}

        </div>
    )
}

export default FavoriteComponent