import { Outlet } from "react-router"
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar"

const AppLayout = () => {
    return(
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default AppLayout;

