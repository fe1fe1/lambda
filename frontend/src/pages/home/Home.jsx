import React from "react";
import { Link } from "react-router-dom";
import HomeCarousel from "../../components/carousel/Carousel";
import "./Home.scss";

const Home = () => {
    return (
        <div className="hero-container">
            <div className="hero-tittle-container py-3">
                <h1 className="text-center hero-tittle">LAMBDA</h1>
            </div>
            <HomeCarousel />
        </div>
    );
};

export default Home;
