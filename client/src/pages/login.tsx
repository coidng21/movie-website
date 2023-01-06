import { FormEvent, Fragment, useState } from "react";
import InputGroup from "../components/InputGroup";
import Link from "next/link";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../context/auth";
import Router, { useRouter } from "next/router";

const Login = () => {
    let router = useRouter();
    const[username, setUserName] = useState("");
    const[password, setPassword] = useState("");
    const[errors, setErrors] = useState<any>({});
    const{authenticated} = useAuthState();
    const dispatch = useAuthDispatch();

    if (authenticated) {
        router.push("/");
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const res = await axios.post("/auth/login", {password, username}, {withCredentials: true})
            console.log("LOGIN CLIENT", document.cookie);
            dispatch("LOGIN", res.data?.user);
            Router.push("/");
        } catch (error: any) {
            console.error(error);
            setErrors(error?.response?.data || {});
        }
    }

    return (
        <Fragment>
             <div className="menu">
                <a id="logo" href="#none">HJ.movie</a>
            </div>
            <div className="auth">
                <div className="auth-container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <InputGroup
                            desc='Username'
                            type='username'
                            placeholder='Enter Username'
                            value={username}
                            setValue={setUserName}
                            error={errors.username}
                        />
                        <InputGroup
                            desc='Password'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            setValue={setPassword}
                            error={errors.password}
                        />
                        <button className="auth-btn">Log in</button>
                    </form>
                    <small className="auth-direct">
                        Not Registered Yet? 
                        <Link legacyBehavior href="/register">
                            <a> Register</a>
                        </Link>
                    </small>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;