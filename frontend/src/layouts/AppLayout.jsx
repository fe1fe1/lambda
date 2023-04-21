import { Outlet } from "react-router"
import Navbar from "../components/navbar/Navbar"

const AppLayout = () => {
    return(
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default AppLayout;

