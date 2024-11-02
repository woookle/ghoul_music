import React from "react";
import logo from "../../assets/images/logo.svg";
import git from "../../assets/images/githubLOGO.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <NavLink to={"/"}><img src={logo} alt="logo" /></NavLink>
        <a href="https://github.com/woookle" target="_blank"><img src={git} alt="github" /></a>
      </div>
    </footer>
  )
}

export default Footer;