import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

                <div className="cards-section">
                    <div className="products-card">
                        <FontAwesomeIcon
                            icon={faGamepad}
                            size="2xl"
                            className="gamepad-logo"
                        />
                    </div>
                    <div className="shopping-card">
                    </div>
                    <div className="shipping-card">
                    </div>
                </div>

                <div className="block-container">
                    test 
                </div>

            </div>
        </div>
    );
};

export default Home;
