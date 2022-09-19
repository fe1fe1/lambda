import React from "react";
import HomeCarousel from "../../components/carousel/Carousel";
import "./Home.scss";

const Home = () => {
    return (
        <div className="hero-container">
            <div className="hero-bg">
                <div className="hero-tittle-container py-3">
                    <h1 className=" hero-tittle">LAMBDA</h1>
                </div>
            </div>
            <div className="main-section">
                <div className="carousel w-50 mx-auto">
                    <HomeCarousel />
                </div>
            </div>
        </div>
    );
};

export default Home;
