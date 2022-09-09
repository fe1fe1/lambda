import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages//home/Home";
import Store from "./pages/store/Store";
import "./App.scss";
import HomeCarousel from "./components/carousel/Carousel";

function App() {
    return (
        <div className="App">
            <div className="container">
                <Navbar />
            </div>
            <>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                </Routes>
            </>
        </div>
    );
}

export default App;
