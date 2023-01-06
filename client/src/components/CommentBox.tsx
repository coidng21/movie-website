import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

interface CommentBoxProps {
    className?: string;
    comment?: string;
    username?: string;
    createdDate?: string;
    imageUrl?: string;
} 

const CommentBox: React.FC<CommentBoxProps> = ({
    className = "",
    comment,
    username,
    createdDate,
    imageUrl,
}) => {
    let userLinkUrl = process.env.CLIENT_BASE_URL + `/user/${username}`;
    return (
        <Fragment>
            <div className="commentBox-container">
                {/* <div className="commentBox-img">
                    <a href={`user/${username}`}>
                        <img 
                            src={imageUrl} 
                            alt="Profile-image" 
                            className="comment-profile-image"
                        />
                    </a>
                </div> */}
                <div className="commentBox-info">
                    <div><b>{username}</b></div>
                    <div>{createdDate}</div>
                    <div>{comment}</div>
                </div>
            </div>
        </Fragment>
    )
}

export default CommentBox;