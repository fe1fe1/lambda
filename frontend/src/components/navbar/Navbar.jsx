import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentToken, selectCurrentUsername } from "../../features/user/userSlice";
const Navbar = (props) => {

    const username = useSelector(selectCurrentUsername)
    const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch();

    const handleLogut = () => {
        dispatch(logOut());
    }

    return (
        <div className="custom-navbar">
            <div className="custom-container">
                <div className="left">
                    <div className="custom-logo">
                        <Link to="/">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Half-Life_lambda_logo.svg/365px-Half-Life_lambda_logo.svg.png"
                                alt=""
                            />
                        </Link>
                    </div>
                    <ul className="nav">
                        <li>
                            <Link to="/">HOME</Link>
                        </li>
                        <li>
                            <Link to="/store">STORE</Link>
                        </li>
                        <li>ABOUT US</li>
                    </ul>
                </div>
                <div className="right">
                    <div className="profile-container">
                        {token ? (
                            <div className="user-profile">
                                <span className="profile-navbar-username">{username}</span>
                                <div className="user-profile-dropdown">
                                    <span>settings</span>
                                    <button className="logout-button" onClick={handleLogut}>logout</button>
                                </div>
                            </div>

                        ):(
                            <div className="login-navbar-container">
                                <Link className="login-button" to="login">
                                    login
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="cart">
                        <Link to="/cart">
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                size="2x"
                                className="cart-logo"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
