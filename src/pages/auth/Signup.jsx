import React, { useState, useEffect } from "react";
import { Image, Button } from "antd";
import Select from "antd/lib/select";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import axios from "axios";
import authimg from "../../assets/authimg.svg";
import "./auth.css";
import Navbar from "../../constants/navbar/Navbar";


const myAlgoWallet = new MyAlgoConnect();

const Signup = () => {
  const [displayText, setDisplayText] = useState("Retailer");
  const [textTitle, setTextTitle] = useState("Retailer");

  const [addresses, setAddresses] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authorisedId, setAuthorisedId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedDetails = localStorage.getItem("registrationDetails");
    if (savedDetails) {
      const parsedDetails = JSON.parse(savedDetails);
      setName(parsedDetails.name);
      setEmail(parsedDetails.email);
      setPassword(parsedDetails.password);
      setAuthorisedId(parsedDetails.authorisedId);
      setWalletAddress(parsedDetails.walletAddress);
    }
  }, []);

  const { Option } = Select;

  const handleDropdownChange = (value) => {
    setDisplayText(value);
    setTextTitle(value);
  };

  async function connectToMyAlgoAndSendData() {
    try {
      const accounts = await myAlgoWallet.connect();
      const addresses = accounts.map((account) => account.address);
      setAddresses(addresses);
      setWalletAddress(addresses[0]);

      const userData = {
        name,
        email,
        password,
        authorisedId: authorisedId,
        walletAddress: addresses[0],
        role: textTitle,
      };

      // Send the user data to the backend
      await axios.post("http://localhost:5000/auth/create", userData);

      toast.success("User details stored successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error connecting or storing user details:", error);
      toast.error(
        "Error connecting or storing user details. Please try again."
      );
    }
  }

  return (
    <>
      <div className="signupContainer">
        <div className="signupContainerleft">
          <div className="signupContainernav">
            <Navbar />
            <Select
              value={displayText}
              style={{ width: 150 }}
              onChange={handleDropdownChange}
            >
              <Option value="Retailer">Retailer</Option>
              <Option value="Distributor">Distributor</Option>
            </Select>
          </div>
          <Image src={authimg} preview={false} alt="Connect Wallet" />
        </div>
        <div className="connectLayout-right">
          <h1 className="connectLayout-title">Register as {textTitle}</h1>
          <h4 className="connectLayout-subtitle">
            You need to connect to your crypto wallet to continue
          </h4>{" "}
          <div className="connectLayout_registrationbox">
            <label htmlFor="name">Name</label>
            <input
              className="connectLayout_registration"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="gmailId">Gmail ID</label>
            <input
              className="connectLayout_registration"
              type="email"
              id="gmailId"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              className="connectLayout_registration"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="authorisedId">Registered {textTitle} ID</label>
            <input
              className="connectLayout_registration"
              type="text"
              id="authorisedId"
              value={authorisedId}
              onChange={(e) => setAuthorisedId(e.target.value)}
              required
            />
          </div>
          <Button
            className="common-squadButton"
            style={{ width: "fit-content", padding: "0rem 3rem" }}
            onClick={connectToMyAlgoAndSendData}
          >
            {addresses
              ? `Wallet Address: ${addresses[0].slice(0, 10)}`
              : "Connect MyAlgoConnect Wallet"}
          </Button>
          <p style={{ cursor: "pointer", color: "white" }}>
            Already have an account? <a href="/signin">Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
