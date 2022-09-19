import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
const Navbar = (props) => {
    return (
        <div className="custom-navbar">
            <div className="custom-container">
                <div className="left">
                    <div className="custom-logo">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Half-Life_lambda_logo.svg/365px-Half-Life_lambda_logo.svg.png"
                            alt=""
                        />
                    </div>
                    <ul className="nav">
                        <li>
                            <Link to="/">HOME</Link>
                        </li>
                        <li>
                            <Link to="/store">STORE</Link>
                        </li>
                        <li>ABOUT US</li>
                    </ul>
                </div>
                <div className="right"></div>
            </div>
        </div>
    );
};

export default Navbar;
