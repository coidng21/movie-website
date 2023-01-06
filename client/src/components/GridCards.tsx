import { Fragment } from "react";

interface GridCardProps {
    className?: string;
    image?: string | null;
    id?: number;
    name?: string;
}

const GridCard: React.FC<GridCardProps> = ({
    className = "",
    image = "",
    id,
    name = "",
}) => {
    return (
        <Fragment>
            <div className="grid-card-container">
                <div className="grid-card">
                    <a href={`/movie/${id}`}>
                        {image && <img src={image} alt={name}/>}
                    </a>
                </div>
            </div>
        </Fragment>
    )
}

export default GridCard;