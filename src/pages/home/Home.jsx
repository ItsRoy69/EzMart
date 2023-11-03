import React from "react";
import { Button, Image } from "antd";
import heroimg from "../../assets/home1.svg";
import belowimg from "../../assets/home2.svg";
import "./home.css";
import Navbar from "../../constants/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="homePageContainer">
        <div className="heroSection">
          <div className="homePageContainer-left">
            <div className="homePageContainer-left-title">
              Simplifying Supply Chains
            </div>
            <div className="homePageContainer-left-subtitle">
              Streamlining Distribution Systems for Efficient Management.
            </div>
            <Button
              className="homeStartedButton"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
          </div>
          <div className="homePageContainer-right">
            <Image preview={false} src={heroimg} className="heroimg" />
          </div>
        </div>

        <div className="featuresSection">
          <h1 className="featuresTitle">
            Efficiently Sell Your Products: Simplify and Accelerate
            Distribution, Minimizing Costs and Complexity
          </h1>
          <Image
            preview={false}
            src={belowimg}
            className="feature-network-img"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
