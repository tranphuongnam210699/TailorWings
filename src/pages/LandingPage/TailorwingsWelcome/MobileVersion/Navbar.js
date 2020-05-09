import React, { Component } from "react";
// import Image, SVG
import logoTW from "../../../../assets/imageHomePage/Logo Header.svg";

class Navbar extends Component {
    render() {
        return (
            <div className="navbarHeaderLandingPage d-flex justify-content-between align-items-center">
                <div className="logoTW">
                    <img src={logoTW} alt="" />
                </div>
                <div
                    className="button d-flex justify-content-center align-items-center"
                    onClick={() => this.props.history.push("/")}
                >
                    KHÁM PHÁ NGAY
                </div>
            </div>
        );
    }
}

export default Navbar;
