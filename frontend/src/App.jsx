import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages//home/Home";
import Store from "./pages/store/Store";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

const App = () => {
    return (
        <div className="App">
            <div className="container">
                <Navbar />
            </div>
            <>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </>
        </div>
    );
};

export default App;
