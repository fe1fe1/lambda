import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import "./Login.scss";

import { useDispatch, useSelector } from "react-redux"
import { selectCurrentToken, setCredentials } from "../../features/user/userSlice.js"
import { useLoginMutation } from "../../features/user/userApiSlice.js"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...userData }));
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (err) {
            console.log(err);
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }

    if (token)
        navigate("/")

    return (
        <div className="login-container navbar-margin">
            {isLoading ? (<h1>Loading</h1>):(
                <form className="block-container user-form" onSubmit={handleSubmit}>
                    <div className="user-form-element user-form-header">
                        <h2>LOGIN</h2>
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
            )}
        </div>
    );
};

export default Login;
