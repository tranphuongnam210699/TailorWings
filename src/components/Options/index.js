import React from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import ButtonFilter from "components/Button/Filter";
import Sort from "components/Sort";

Options.propTypes = {
    filter: PropTypes.array,
    onFilterChange: PropTypes.func,
};

Options.defaultProps = {
    filter: null,
    onFilterChange: null
};

function Options(props) {
    if (!props.filter || !props.onFilterChange) return <Fragment />;
    return (
        <div className="c-options">
            <div className="c-options__filters">
                {props.filter.map((item, index) => {
                    return (
                        <ButtonFilter
                            key={index}
                            info={{...item, index: index}}
                            handleClick={props.onFilterChange}
                        />
                    );
                })}
            </div>
            <div className="c-options__sorts">
                <Sort text="Bộ Lọc & Sắp Xếp" isDisable={true} />
                <Sort text="Bộ Sưu Tập" isDisable={true} />
            </div>
        </div>
    );
}

export default Options;
