import React from "react";
import { Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Row className="navbar-navbarContainer" align="middle" justify="space-between">
      <div className="navbar-logo">EzMart</div>
      <Button className="navbar-getStartedButton" onClick={() => navigate("/connect")}>
        Get Started
      </Button>
    </Row>
  );
};

export default Navbar;
