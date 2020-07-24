import React from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import rightArrow from "../../../assets/Icon/right-arrow-white.svg";

ButtonConfirm.propTypes = {
    text: PropTypes.string,
    paddingLeft: PropTypes.string,
};

ButtonConfirm.defaultProps = {
    text: null,
    padding: "1.5rem 10rem",
};

function ButtonConfirm(props) {
    if (!props.text) return <Fragment />;
    return (
        <button className="button-confirm" style={{ padding: props.padding }}>
            <span className="button-confirm__text">{props.text}</span>
            <img src={rightArrow} alt={props.text} />
        </button>
    );
}

export default ButtonConfirm;

// ---------- NOTES ----------
// How to use:
// default padding: 1.5rem 10rem
// Example: <ButtonConfirm text="EXAMPLE" padding="1.5rem 8.4rem"
// ---------- END ----------