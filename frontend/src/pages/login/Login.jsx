import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login-container">
            <form className="block-container user-form">
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
        </div>
    );
};

export default Login;
