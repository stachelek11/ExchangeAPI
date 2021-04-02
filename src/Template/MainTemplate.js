import React from "react";
import "./MainTemplate.scss";
import SearchInput from "../components/SearchInput/SearchInput";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const MainTemplate = ({ children }) => (
  <div className="template">
    <nav className="navigation">
      <Link className="navigation__logo" to={`/`}>
        <img className="navigation__logo" src={logo} alt="logo" />
      </Link>
      <SearchInput />
      <a className="navigation__buy" href="https://www.marketwatch.com/">
        Buy stocks
      </a>
    </nav>
    {children}
  </div>
);

export default MainTemplate;
