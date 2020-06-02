import React, { Component } from "react";
import Swiper from "react-id-swiper";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { getCurrentDate } from "services/CommonFunction";
import { trackingIncrement } from "services/Fundamental";

export default class SelectionCategory extends Component {
    /*********************************
     *  Description: to update tracking counter
     *
     *
     *  Call by:
     */
    handleTracking = (catID) => {
        let date = getCurrentDate();
        if (!catID) return;
        trackingIncrement("tracking", date, "categories", catID);
    };
    /************_END_****************/

    AutoSlidesPerView = () => {
        const {
            categoriesInfo,
            currentActiveCategory,
            renderProducts,
        } = this.props;
        const params = {
            slidesPerView: "auto",
            spaceBetween: 10,
            slideToClickedSlide: true,
            centeredSlides: true,
            centeredSlidesBounds: true,
        };
        let isAllActive = currentActiveCategory === "all";
        if (renderProducts.length === 0) {
            isAllActive = false;
        }
        return (
            <Swiper {...params}>
                <Link
                    style={{
                        width: "auto",
                        border: "none",
                        textDecoration: "none",
                    }}
                    to={{
                        pathname: "/shopping-store",
                        search: "?cat=all&search=",
                    }}
                    onClick={() => this.props.categoryActiveHandling("all")}
                >
                    <div
                        className={classNames("contentSelection", {
                            active: isAllActive,
                        })}
                    >
                        <span>Tất cả</span>
                    </div>
                </Link>
                {categoriesInfo.map((category, index) => {
                    let isActive = currentActiveCategory === category.id;
                    if (renderProducts.length === 0) {
                        isActive = false;
                    }
                    return (
                        <Link
                            key={index}
                            style={{
                                height: "fit-content",
                                width: "fit-content",
                                border: "none",
                                textDecoration: "none",
                            }}
                            to={{
                                pathname: "/shopping-store",
                                search: `?cat=${category.id}&search=`,
                            }}
                            onClick={() => {
                                this.handleTracking(category.id);
                                this.props.categoryActiveHandling(category.id);
                            }}
                        >
                            <div
                                key={index}
                                className={classNames("contentSelection", {
                                    active: isActive,
                                })}
                            >
                                <span>{category.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </Swiper>
        );
    };

    render() {
        return (
            <div className="carousel-wraper">{this.AutoSlidesPerView()}</div>
        );
    }
}
