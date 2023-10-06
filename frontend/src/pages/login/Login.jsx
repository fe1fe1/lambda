import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

import { useDispatch, useSelector } from "react-redux";
import {
    selectCurrentToken,
    setCredentials,
} from "../../features/user/userSlice.js";
import { useLoginMutation } from "../../features/user/userApiSlice.js";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [setErrMsg] = useState("");
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();

    const handleAdminUserDemoButton = () => {
        setEmail("admin@demo");
        setPassword("admindemopwd");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...userData }));
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (err) {
            console.log(err);
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg("No Server Response");
            } else if (err.originalStatus === 400) {
                setErrMsg("Missing Email or Password");
            } else if (err.originalStatus === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
        }
    };

    if (token) navigate("/");

    return (
        <div className="login-container navbar-margin">
            {isLoading ? (
                <h1>Loading</h1>
            ) : (
                <>
                    <form
                        className="block-container user-form login-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="user-form-element user-form-header">
                            <h2>LOGIN</h2>
                        </div>
                        <div className="user-form-element">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                className="user-form-input"
                                value={email}
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
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div className="user-form-element">
                            <label />
                            <button className="user-form-button" type="submit">
                                LOGIN
                            </button>
                        </div>
                        <div className="user-form-element">
                            <label />
                            <div>
                                Don't have an account?{" "}
                                <Link className="login-create-acc" to="/signup">
                                    Create one here.
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="suggestion">
                        <p className="suggestion-text">
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                style={{ color: "#000000" }}
                                className="suggestion-icon"
                                size="l"
                            />
                            To use demo Admin User:
                            <button
                                className="suggestion-button"
                                onClick={handleAdminUserDemoButton}
                            >
                                Admin User
                            </button>
                        </p>
                        <p className="suggestion-text">
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                style={{ color: "#000000" }}
                                className="suggestion-icon"
                                size="l"
                            />
                            This website is a personal project for learning
                            purposes only. Please do not give real personal
                            information. All information could be seen by users
                            with Admin role (including the one provided for demo
                            purposes).
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Login;
