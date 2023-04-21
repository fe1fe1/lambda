import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages//home/Home";
import Store from "./pages/store/Store";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import AppLayout from "./layouts/AppLayout";
import RequireAuth from "./layouts/RequireAuth";

const App = () => {
    return (
        <div className="App">
            <Routes>
                {/* public routes */}
                <Route path="/" element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>

                {/* auth protected routes*/}
                <Route element={<RequireAuth />}>
                    <Route path="/cart" element={<Cart />} />
                </Route>
            </Routes>

        </div>
    );
};

export default App;
