import React from "react";
import { Image } from "antd";
import heroimg from "../../assets/hero.svg";
import belowimg from "../../assets/network.svg";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-homePageContainer">
        <div className="home-heroSection">
          <div className="home-homePageContainer-left">
            <div className="home-homePageContainer-left-title">
              Simplifying Supply Chains
            </div>
            <div className="home-homePageContainer-left-subtitle">
              Streamlining Distribution Systems for Efficient Management.
            </div>
          </div>
          <div className="home-homePageContainer-right">
            <Image preview={false} src={heroimg} className="home-heroimg" />
          </div>
        </div>

        <div className="home-featuresSection">
          <h1 className="home-featuresTitle">
            Efficiently Sell Your Products: Simplify and Accelerate
            Distribution, Minimizing Costs and Complexity
          </h1>
          <Image
            preview={false}
            src={belowimg}
            className="home-feature-network-img"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
