import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "../../../assets/Icon/menu.svg";
import Logo from "../../../assets/Icon/logo.svg";
import CartInfo from "components/CartInfo";

NavbarShopping.propTypes = {
    cartQuantity: PropTypes.number,
};


function NavbarShopping(props) {
    return (
        <div className="c-navbar-shopping">
            <div className="c-navbar-shopping__menu">
                <img src={MenuIcon} alt="menu-icon" />
            </div>
            <div className="c-navbar-shopping__logo">
                <img src={Logo} alt="tailorwings" />
            </div>
            <div className="c-navbar-shopping__info">
                <CartInfo active={true} />
            </div>
        </div>
    );
}

export default NavbarShopping;
