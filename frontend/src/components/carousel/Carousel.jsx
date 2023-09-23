import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.scss";

const HomeCarousel = () => {
    return (
        <div className="block-container mx-auto ">
            <Carousel variant="dark" className="w-75 mx-auto">
                <Carousel.Item className="mt-3">
                    <div className="slide-img-container wii">
                        <img
                            className="slide-img"
                            src="./images/wii.png"
                            alt="Second slide"
                        />
                    </div>

                    <Carousel.Caption>
                        <div className="caption-container">
                            <h3>Wii</h3>
                            <p>
                                The new console from Nintendo is available now!
                            </p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="mt-3">
                    <div className="slide-img-container ps3 d-flex">
                        <img
                            className="slide-img"
                            src="./images/ps3.png"
                            alt="First slide"
                        ></img>
                        <div className="bg-test"></div>
                    </div>
                    <Carousel.Caption>
                        <div className="caption-container">
                            <h3>PlayStation 3</h3>
                            <p>
                                All the power of the new generation in a slick new design!
                            </p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="mt-3">
                    <div className="slide-img-container xbox-360">
                        <img
                            className="slide-img"
                            src="./images/xbox-360.png"
                            alt="Second slide"
                        />
                    </div>

                    <Carousel.Caption>
                        <div className="caption-container">
                            <h3>Xbox 360</h3>
                            <p>
                                The successor of the first Xbox, a stronger, faster, next gen console!
                            </p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HomeCarousel;
