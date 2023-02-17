import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages//home/Home";
import Store from "./pages/store/Store";
import "./App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <div className="container">
                    <Navbar />
                </div>
                <>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </>
            </div>
        </QueryClientProvider>
    );
};

export default App;
