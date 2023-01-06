import { FormEvent, Fragment, useState } from "react";
import InputGroup from "../components/InputGroup";
import { useRouter } from "next/router";
import axios, { Axios } from "axios";
import Link from "next/link";
import { useAuthState } from "../context/auth";

const Register = () => {

    const[username, setUserName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errors, setErrors] = useState<any>({});

    const router = useRouter();

    const { authenticated } = useAuthState();
    
    if (authenticated) {
        router.push("/");
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post("/auth/register", {
                email,
                password,
                username,
            });
            console.log(res);
            router.push("/login");
        } catch (error:any) {
            console.log(error);
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
                    <h1>Register</h1>
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
                            desc='Email'
                            type='email'
                            placeholder='Enter Email Address'
                            value={email}
                            setValue={setEmail}
                            error={errors.email}
                        />
                        <InputGroup
                            desc='Password'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            setValue={setPassword}
                            error={errors.password}
                        />
                        <button className="auth-btn">Register</button>
                    </form>
                    <small className="auth-direct">
                        Already Registered? 
                        <Link legacyBehavior href="/login">
                            <a> Log in</a>
                        </Link>
                    </small>
                </div>
            </div>

        </Fragment>
    )
}

export default Register;