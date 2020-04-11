import React, { Component } from "react";
import "./SizeSelection.scss";
import { Link } from "react-router-dom";
import { Icon, Badge } from "antd";
import iconShoppingBadge from "../../../../assets/imageHomePage/shopping-cart.svg";

export default class Navbar extends Component {
    render() {
        const { totalProductsOnCart } = this.props;
        return (
            <div className="navbarHeader d-flex flex-row align-items-center justify-content-between">
                <div className="iconBack_wrapper">
                    <div
                        className="iconBack"
                        onClick={() => this.props.onContentChange("fabric")}
                    >
                        <svg
                            width="11"
                            height="18"
                            viewBox="0 0 11 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.26668 17.3333C8.04218 17.3325 7.82016 17.2863 7.61395 17.1975C7.40774 17.1087 7.22159 16.9792 7.06668 16.8167L0.63335 10.15C0.327972 9.83845 0.156921 9.41959 0.156921 8.98333C0.156921 8.54708 0.327972 8.12822 0.63335 7.81667L7.30002 1.15C7.45541 0.994606 7.6399 0.871339 7.84294 0.787238C8.04597 0.703138 8.26359 0.659851 8.48335 0.659851C8.70312 0.659851 8.92073 0.703138 9.12377 0.787238C9.3268 0.871339 9.51129 0.994606 9.66668 1.15C9.82208 1.3054 9.94535 1.48989 10.0295 1.69292C10.1136 1.89596 10.1568 2.11357 10.1568 2.33334C10.1568 2.5531 10.1136 2.77072 10.0295 2.97375C9.94535 3.17679 9.82208 3.36127 9.66668 3.51667L4.16668 9L9.46668 14.5C9.7771 14.8123 9.95134 15.2347 9.95134 15.675C9.95134 16.1153 9.7771 16.5377 9.46668 16.85C9.30897 17.0065 9.12157 17.1298 8.91549 17.2128C8.70942 17.2958 8.48882 17.3368 8.26668 17.3333Z"
                                fill="#FF6D3B"
                            />
                        </svg>
                    </div>
                </div>
                <div className="titleHeader d-flex justify-content-center">
                    Chọn size
                </div>
                <Link
                    to={"/shopping-cart"}
                    style={{ color: "rgb(38, 153, 251)" }}
                >
                    <div className="iconShoppingCart">
                        <img src={iconShoppingBadge} alt="" />
                        <span>({totalProductsOnCart})</span>
                    </div>
                </Link>
            </div>
        );
    }
}
