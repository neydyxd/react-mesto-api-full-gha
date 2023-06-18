import logo from "../images/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({ email, onSignOut }) {
  const [headerInfo, setHeaderInfo] = useState({});
  const location = useLocation();

  const handleLinkClick = () => {
    if (location.pathname === "/") {
      onSignOut();
    }
  };

  useEffect(() => {
    let headerInfo = {};
    if (location.pathname === "/") {
      headerInfo = {
        email: email,
        link: "/sign-in",
        linkText: "Выйти",
      };
    } else if (location.pathname === "/sign-up") {
      headerInfo = {
        email: "",
        link: "/sign-in",
        linkText: "Войти",
      };
    } else if (location.pathname === "/sign-in") {
      headerInfo = {
        email: "",
        link: "/sign-up",
        linkText: "Регистрация",
      };
    }
    setHeaderInfo(headerInfo);
  }, [location]);
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип место" />
      <div className="header__info">
        <p className="header__email">{headerInfo.email}</p>
        <Link
          className="header__link"
          to={headerInfo.link}
          onClick={handleLinkClick}
        >
          {headerInfo.linkText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
