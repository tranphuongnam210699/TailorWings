import classNames from "classnames";
import PropTypes from "prop-types";
import { default as React } from "react";
import sizeDefaultOption from "../../../assets/Icon/size-default-option.svg";
import sizeModifiedOption from "../../../assets/Icon/size-modified-option.svg";

const DEFAULT_TEXT = "Size Chuẩn";
const MODIFIED_TEXT = "Size Đo";

ButtonSizeOption.propTypes = {
    isDefault: PropTypes.bool,
    isActive: PropTypes.bool,
};

ButtonSizeOption.defaultProps = {
    isDefault: true,
    isActive: false,
};

function ButtonSizeOption(props) {
    let icon = props.isDefault ? sizeDefaultOption : sizeModifiedOption;
    let text = props.isDefault ? DEFAULT_TEXT : MODIFIED_TEXT;
    return (
        <button
            className={classNames("c-button-size-option", {
                "c-button-size-option--active": props.isActive,
            })}
        >
            <img
                src={icon}
                alt="size-đo"
                className={classNames({
                    "c-button-size-option--icon-default": props.isDefault,
                    "c-button-size-option--icon-measured": !props.isDefault,
                })}
            />
            <span>{text}</span>
        </button>
    );
}

export default ButtonSizeOption;

// ---------- NOTES ----------
// default supported: isDefault: true | isActive: false
// ---------- END ----------
