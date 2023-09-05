import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Signup.scss";

import { useDispatch } from "react-redux";
import { useSignupMutation } from "../../features/user/userApiSlice";
import { useLoginMutation } from "../../features/user/userApiSlice.js"
import { setCredentials } from "../../features/user/userSlice.js"

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const [signup, signupResult] = useSignupMutation();
    const [login, signinResult] = useLoginMutation();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const registeredUser = await signup({username,email,password}).unwrap();
            const signinUser = await login({...registeredUser}).unwrap();
            dispatch(setCredentials({ ...signinUser}));
            setUsername('');
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (err) {
            console.log(err);
            console.log(signupResult?.error);
            console.log(signinResult?.error);
            if (!err?.originalStatus) {
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.originalStatus === 409) {
                setErrMsg('Duplicate username and/or email');
            } else {
                setErrMsg('Signup Failed');
            }
        }

    }

    return (
        <div className="signup-container navbar-margin">
            {signupResult.isLoading? (<h1>loading</h1>):(
                signinResult.isLoading? (<h1>loading</h1>):(
                    <form className="block-container user-form" onSubmit={handleSubmit}>
                        <div className="user-form-element user-form-header">
                            <h2>SIGN UP</h2>
                        </div>
                        <div className="user-form-element">
                            <input
                                type="name"
                                id="name"
                                placeholder="Name"
                                className="user-form-input"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>
                        </div>
                        <div className="user-form-element">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                className="user-form-input"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div className="user-form-element">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="user-form-input"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div className="user-form-element">
                            <label />
                            <button className="user-form-button" type="submit">
                                SIGN UP
                            </button>
                        </div>
                    </form>
                ))}
        </div>
    );
};

export default Signup;
