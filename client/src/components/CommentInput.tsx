import React, { Fragment } from "react";

interface CommentInputProps {
    className?: string;
    type?: string;
    placeholder?: string;
    value: string;
    setValue: (str: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
    className = "",
    type = "text",
    placeholder = "",
    value,
    setValue
}) => {
    return (
        <div className="comment-wrapper">
            <textarea
            className="comment-area"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default CommentInput;