import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import IconMinus from "../../assets/Icon/minus.svg";
import IconPlus from "../../assets/Icon/plus.svg";

Quantity.propTypes = {
    quantity: PropTypes.number,
    onChange: PropTypes.func,
};

Quantity.defaultProps = {
    quantity: 1,
    onChange: null,
};

function Quantity(props) {
    /*--------------*/
    const [renderQuantity, setRenderQuantity] = useState(props.quantity);
    /*--------------*/
    if (!props.onChange) return <Fragment />;
    /*********************************
     *  Description: handle quantity changing
     *
     *
     *  Call by:
     */
    function onQuantityChange(isMinus) {
        let newQuantity = renderQuantity;
        let currentQuantity = renderQuantity;
        /*--------------*/
        if (isMinus) {
            newQuantity = currentQuantity - 1 > 0 ? currentQuantity - 1 : 1;
        } else {
            newQuantity = currentQuantity + 1 > 10 ? 10 : currentQuantity + 1;
        }
        /*--------------*/
        if (newQuantity !== renderQuantity) {
            setRenderQuantity(newQuantity);
            props.onChange(Number(newQuantity));
        }
    }
    /************_END_****************/
    return (
        <div className="c-quantity">
            <div
                className="c-quantity__minus"
                onClick={() => onQuantityChange(true)}
            >
                <img src={IconMinus} alt="icon-minus" />
            </div>
            <div className="c-quantity__number">
                <span>{renderQuantity}</span>
            </div>
            <div
                className="c-quantity__plus"
                onClick={() => onQuantityChange(false)}
            >
                <img src={IconPlus} alt="icon-plus" />
            </div>
        </div>
    );
}

export default Quantity;
