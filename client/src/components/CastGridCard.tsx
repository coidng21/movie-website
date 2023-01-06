import React, { Fragment } from "react";
import { IMAGE_BASE_URL } from '../config';

interface CastGridCardProps {
    className?: string;
    imageUrl?: string;
    characterName?: string;
    actorName?: string;
}

const CastGridCard:React.FC<CastGridCardProps> = ({
    className="",
    imageUrl,
    characterName,
    actorName
}) => {
    return (
        <Fragment>
            <div className="actor">
                <div className="actor-img">
                    <div><img src={imageUrl} alt="Actor Image"/></div>
                </div>
                <div className="actor-info">
                    <p className="actor-charName">{characterName}</p>
                    <p className="actor-name">{actorName}</p>
                </div>
            </div>
        </Fragment>
    )
}

export default CastGridCard;