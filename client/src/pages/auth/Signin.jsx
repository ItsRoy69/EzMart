import React, { useState } from "react";
import { Image } from "antd";
import { Button } from "antd";
import authimg from "../../assets/growth.svg";
import "./auth.css";
import { toast } from "react-hot-toast";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { set } from "mongoose";

const Signin = () => {
  const [displayText, setDisplayText] = useState("Retailer");
  const [textTitle, setTextTitle] = useState("Distributor");

  const navigate = useNavigate();
  const {setUser} = useUserContext();

  const handleClick = () => {
    if (displayText === "Retailer") {
      setDisplayText("Distributor");
      setTextTitle("Retailer");
    } else {
      setDisplayText("Retailer");
      setTextTitle("Distributor");
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());
    console.log(entries);
    const loadingToast = toast.loading("Logging in...");
  
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entries),
      });
  
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.error) throw responseData.error;
  
      // Determine redirection based on user role
      if (responseData.user.role === "distributor") {
        navigate("/dashboard2");
      } else if (responseData.user.role === "retailer") {
        navigate("/dashboard");
      } else {
        // Handle unrecognized role
        throw new Error("Unrecognized user role");
      }
  
      setUser(responseData.user);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error ?? "Error logging in");
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  

  return (
    <>
      <div className="connectLayout-connectLayoutContainer">
        <div className="connectLayout-left">
          <div className="connectLayout-navContainer">
            <Logo/>
            <h3
              onClick={handleClick}
              style={{
                cursor: "pointer",
                padding: "8rem",
                textDecoration: "underline",
              }}
            >
              I am already registered as {displayText}
            </h3>
          </div>
          <Image
            src={authimg} // Use 'src' instead of 'image'
            preview={false} // Disable image preview
            alt="Connect Wallet" // Provide alt text for accessibility
          />
        </div>
        <form onSubmit={loginUser} className="connectLayout-right">
          <h1 className="connectLayout-title">Login as {textTitle}</h1>
          <h4 className="connectLayout-subtitle">
            You need to connect to your crypto wallet to continue
          </h4>{" "}
          <div className="connectLayout_registrationbox">
            <label htmlFor="gmailId">Gmail ID</label>
            <input
              name="email"
              className="connectLayout_registration"
              type="email"
              id="gmailId"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              className="connectLayout_registration"
              type="password"
              id="password"
              required
            />
          </div>
          <button
            type="submit"
            className="common-squadButton"
            style={{ width: "fit-content", padding: "0rem 3rem", cursor: "pointer" }}
          >
            Log in
          </button>
          <p style={{ cursor: "pointer", color: "white" }}>
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signin;
