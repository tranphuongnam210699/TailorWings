import React from "react";
import PropTypes from "prop-types";
import ProductItem from "./DesignItem";
import DesignItem from "./DesignItem";
import ButtonLoadMore from "components/Button/LoadMore";

Designs.propTypes = {
    title: PropTypes.string,
    designs: PropTypes.array,
};

Designs.defaultProps = {
    title: "",
    designs: null,
};

function Designs(props) {
    return (
        <div className="c-designs">
            <h2 className="c-designs__title">{props.title}</h2>
            <ul className="c-designs__list">
                {props.designs.map((design, index) => {
                    return <DesignItem design={design} key={index} />;
                })}
            </ul>
            <div className="c-designs__button">
                <ButtonLoadMore />
            </div>
        </div>
    );
}

export default Designs;
