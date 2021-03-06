import React from "react";
import PropTypes from "prop-types";
import IconFaceBook from "../../assets/Icon/facebook-icon.svg";
import IconInstagram from "../../assets/Icon/insta-icon.svg";
import IconYoutube from "../../assets/Icon/youtube-icon.svg";
import LogoBird from "../../assets/Icon/logo-bird.svg";
import { Link } from "react-router-dom";

Footer.propTypes = {};

function Footer(props) {
    return (
        <div className="c-footer--wrapper">
            <div className="c-footer">
                <div className="c-footer__section">
                    <section className="c-footer__section1">
                        <div className="c-footer__option">
                            <Link to="/policy">
                                <span className="c-footer__title">
                                    ĐIỀU KIỆN & ĐIỀU KHOẢN
                                </span>
                            </Link>
                            <a
                                href="https://www.facebook.com/TailorWings"
                                target="_blank"
                            >
                                <span className="c-footer__title">
                                    VỀ TAILOR WINGS
                                </span>
                            </a>
                            <Link to="/support">
                                <span className="c-footer__title">LIÊN HỆ</span>
                            </Link>
                        </div>
                        <div className="c-footer__social-icon">
                            <a
                                href="https://www.facebook.com/TailorWings"
                                target="_blank"
                            >
                                <img
                                    src={IconFaceBook}
                                    alt=""
                                    className="c-footer__fb"
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/tailorwings/"
                                target="_blank"
                            >
                                <img
                                    src={IconInstagram}
                                    alt=""
                                    className="c-footer__ig"
                                />
                            </a>
                            <img
                                src={IconYoutube}
                                alt=""
                                className="c-footer__yt"
                            />
                        </div>
                    </section>
                    <section className="c-footer__section2">
                        <div className="c-footer__info">
                            <span className="c-footer__text">
                                HOTLINE 0902 541 398
                            </span>
                            <span className="c-footer__text">
                                info.tailorwings@gmail.com
                            </span>
                        </div>
                        <div className="c-footer__logo">
                            <img src={LogoBird} alt="" />
                        </div>
                    </section>
                </div>
                <section className="c-footer__section3">
                    <span className="c-footer__text">© 2020 Tailor Wings</span>
                    <span className="c-footer__text">
                        Công ty TNHH Thương Mại Kết Nối Á Âu / Số đăng ký kinh
                        doanh : 0313114301
                    </span>
                </section>
            </div>
        </div>
    );
}

export default Footer;
