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
                            <h3>Second slide label</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
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
                            <h3>First slide label</h3>
                            <p>
                                Nulla vitae elit libero, a pharetra augue mollis
                                interdum.
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
                            <h3>Second slide label</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HomeCarousel;
