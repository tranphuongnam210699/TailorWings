import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import BodyImageContainer from "./BodyImage";
import InfoContainer from "./Info";
import NavbarContainer from "./Navbar";
import OptionContentContainer from "./OptionContent";
import OptionsContainer from "./Options";
import ProductImagesContainer from "./ProductImages";

function SizeContainer() {
    /*--------------*/
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    /*--------------*/
    let productID = null;
    if (window.location.search.match(/id=(.*)\b/)) {
        productID = window.location.search.match(/id=(.*)\b/)[1] || null;
    }
    /*--------------*/
    const selectedProduct = useSelector(
        (state) => state.selection.selectedProduct
    );
    /*--------------*/
    if (!productID) {
        return <Redirect to="/" />;
    }
    /*--------------*/
    if (!selectedProduct)
        return (
            <Redirect
                to={{ pathname: "/selection", search: `?id=${productID}` }}
            />
        );
    return (
        <div className="l-size">
            <NavbarContainer />
            <div className="l-size__section1">
                <div className="l-size--left">
                    <BodyImageContainer />
                    <OptionsContainer />
                    <OptionContentContainer />
                </div>
                <div className="l-size--right">
                    <InfoContainer />
                    <ProductImagesContainer />
                </div>
            </div>
        </div>
    );
}

export default SizeContainer;
