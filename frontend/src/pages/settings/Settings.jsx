import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShippingForm from "../../components/info-forms/shipping-form/ShippingForm";
import "./Settings.scss";

const UserInfo = () => {
    return (
        <div className="navbar-margin">
            <div className="shipping-setting">
                <div className="shipping-form">
                    <ShippingForm className="shipping-form" />
                </div>
                <div className="suggestion">
                    <p className="suggestion-text">
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            style={{ color: "#000000" }}
                            className="suggestion-icon"
                            size="l"
                        />
                        This website is a personal project for learning purposes
                        only. Please do not give real personal information. All
                        information could be seen by users with Admin role
                        (including the one provided for demo purposes).
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
