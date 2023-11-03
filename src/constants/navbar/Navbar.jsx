import React from "react";
import { Button, Row } from "antd";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Row className="navbarContainer" align="middle" justify="space-between">
      <Link to={"/"} className="navbar-logo">
        EzMart
      </Link>
    </Row>
  );
};

export default Navbar;
