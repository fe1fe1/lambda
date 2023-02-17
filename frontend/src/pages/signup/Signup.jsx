import React, { useState } from "react";
import "./Signup.scss";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="signup-container">
            <form className="block-container user-form">
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
                        onChange={(e) => setName(e.target.value)}
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
        </div>
    );
};

export default Signup;
