import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ButtonCTA from "components/Button/CTA";
import DesignerCard from "./DesignerCard";

HomeDesigners.propTypes = {
    title: PropTypes.array,
    designers: PropTypes.array,
};

HomeDesigners.defaultProps = {
    title: new Array(2).fill(""),
    designers: null,
};

function HomeDesigners(props) {
    if (!props.designers) return <Fragment />;
    return (
        <div className="c-home-designers">
            <h2 className="c-home-designers__title">{props.title[0]}</h2>
            <div className="c-home-designers__list">
                {props.designers.map((designer, index) => {
                    return <DesignerCard designer={designer} key={index} />;
                })}
            </div>
            <h2 className="c-home-designers__title">{props.title[1]}</h2>
            <ButtonCTA text="THAM GIA NGAY" />
        </div>
    );
}

export default HomeDesigners;
