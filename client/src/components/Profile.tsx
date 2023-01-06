import { Fragment } from "react";
import { StringLiteral } from "typescript";

interface ProfileProps {
    className?: String;
    imageUrl?: string;
    openFile: (str: string) => void
}

const Profile: React.FC<ProfileProps> = ({
    className = "",
    imageUrl,
    openFile
}) => {
    return (
        <Fragment>
            <div className="profile-image">
            </div>
        </Fragment>
    )
}

export default Profile;