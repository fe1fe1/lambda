import { Navigate, Outlet, useLocation, useNavigate } from "react-router"
import Navbar from "../components/navbar/Navbar"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/user/userSlice"

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)

    return(
        <>
        <Navbar/>
        {token 
            ? <Outlet />
            : <Navigate to="/login" replace />
        }
        </>
    )
}

export default RequireAuth;
