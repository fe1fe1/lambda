import { Navigate, Outlet, } from "react-router"
import Navbar from "../components/navbar/Navbar"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/user/userSlice"
import Footer from "../components/footer/Footer"

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)

    return(
        <>
        <Navbar />
        {token 
            ? <Outlet />
            : <Navigate to="/login" replace />
        }
        <Footer />
        </>
    )
}

export default RequireAuth;
