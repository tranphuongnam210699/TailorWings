import React, { useState } from "react";
import PropTypes from "prop-types";
import MenuIcon from "../../../assets/Icon/menu.svg";
import Logo from "../../../assets/Icon/logo.svg";
import CartInfo from "components/CartInfo";
import { Link } from "react-router-dom";
import Sidebar from "components/Sidebar";

NavbarShopping.propTypes = {
    cartQuantity: PropTypes.string,
};

function NavbarShopping() {
    /*--------------*/
    const [isSidebar, setIsSidebar] = useState(false);

    /*********************************
     *  Description: handle updating isSidebar state to be false
     *
     *
     *  Call by:
     */
    function onSidebarClosed() {
        setIsSidebar(false);
    }
    /************_END_****************/
    return (
        <div className="c-navbar-shopping">
            <div className="c-navbar-shopping__menu">
                <img
                    src={MenuIcon}
                    alt="menu-icon"
                    onClick={() => setIsSidebar(!isSidebar)}
                />
            </div>
            <div className="c-navbar-shopping__logo">
                <Link
                    to={{
                        pathname: "/",
                    }}
                >
                    <img src={Logo} alt="tailorwings" />
                </Link>
            </div>
            <div className="c-navbar-shopping__info">
                <CartInfo active={true} />
            </div>
            <Sidebar isSidebar={isSidebar} onSidebarClosed={onSidebarClosed} />
        </div>
    );
}

export default NavbarShopping;
