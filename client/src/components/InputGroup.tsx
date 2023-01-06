import { Fragment } from "react";
import cls from "classnames";

interface InputGroupProps {
    className?: string;
    type?: string;
    placeholder?: string;
    desc: string;
    value: string;
    error: string | undefined;
    setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
    className = "mb-2",
    type = "",
    placeholder = "",
    desc,
    error,
    value,
    setValue,
}) => {
    return (
        <Fragment>
            <div className={className}>
                <span>{desc}</span>
                <input
                className={cls("input-field", {"error-field": error})}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
                {error && <span className="error-msg">{error}</span>}
            </div>
        </Fragment>
    )
}

export default InputGroup;