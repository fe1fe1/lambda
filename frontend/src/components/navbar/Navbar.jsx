import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
const Navbar = (props) => {
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
                    <div className="login-navbar-container">
                        <Link className="login-button" to="login">
                            login
                        </Link>
                    </div>
                    <div className="cart">
                        <FontAwesomeIcon
                            icon={faCartShopping}
                            size="2x"
                            className="cart-logo"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
