import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { Button } from "antd";
import authimg from "../../assets/growth.svg";
import "./auth.css";
import Logo from "../../components/Logo";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MyAlgoConnect from '@randlabs/myalgo-connect';

const Signup = () => {
  const [displayText, setDisplayText] = useState("Retailer");
  const [textTitle, setTextTitle] = useState("Distributor");

  const navigate = useNavigate();
  const myAlgoConnect = new MyAlgoConnect({
    network: "mainnet", // or "testnet" for Algorand testnet
  });

  const saveRegistrationDetailsToLocalStorage = () => {
    const registrationDetails = {
      name,
      email,
      password,
      retailerId,
      walletAddress: account || walletAddressInput,
    };

    localStorage.setItem(
      "registrationDetails",
      JSON.stringify(registrationDetails)
    );
  };

  useEffect(() => {
    const savedDetails = localStorage.getItem("registrationDetails");
    if (savedDetails) {
      const parsedDetails = JSON.parse(savedDetails);
      setName(parsedDetails.name);
      setEmail(parsedDetails.email);
      setPassword(parsedDetails.password);
      setRetailerId(parsedDetails.retailerId);
      setWalletAddressInput(parsedDetails.walletAddress);
    }
  }, []);

  const handleClick = () => {
    if (displayText === "Retailer") {
      setDisplayText("Distributor");
      setTextTitle("Retailer");
    } else {
      setDisplayText("Retailer");
      setTextTitle("Distributor");
    }
  };

  const [account, setAccount] = useState(null);

  const handleConnectMyAlgoConnectWallet = async () => {
    try {
      await myAlgoConnect.connect();
      const accounts = await myAlgoConnect.accounts();
      const account = accounts[0];
      setAccount(account);
      console.log(`Connected account: ${account}`);
    } catch (error) {
      console.error("Error connecting MyAlgoConnect:", error);
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retailerId, setRetailerId] = useState("");
  const [walletAddressInput, setWalletAddressInput] = useState("");

  const handleRegistration = async () => {
    const loadingToast = toast.loading("Registering...");
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          retailerId,
          walletAddress: account || walletAddressInput,
          role: textTitle.toLowerCase(),
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.error) throw responseData.error;
      saveRegistrationDetailsToLocalStorage();
      toast.success("Registered successfully");
      navigate("/connect");
    } catch (error) {
      console.error("Error registering:", error);
      toast.error(error ?? "Error registering");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <>
      <div className="connectLayout-connectLayoutContainer">
        <div className="connectLayout-left">
          <div className="connectLayout-navContainer">
            <Logo />
            <h3
              onClick={handleClick}
              style={{
                cursor: "pointer",
                padding: "8rem",
                textDecoration: "underline",
              }}
            >
              I want to register as {displayText}
            </h3>
          </div>
          <Image
            src={authimg}
            preview={false}
            alt="Connect Wallet"
          />
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

            <label htmlFor="registeredId">Registered {textTitle} ID</label>
            <input
              className="connectLayout_registration"
              type="text"
              id="registeredId"
              value={retailerId}
              onChange={(e) => setRetailerId(e.target.value)}
              required
            />

            <label htmlFor="address">MyAlgoConnect Wallet Address</label>
            <input
              className="connectLayout_registration"
              type="address"
              id="walletAddress"
              value={account ? account : walletAddressInput}
              onChange={(e) => setWalletAddressInput(e.target.value)}
            />

            <div className="connectLayout_distributorcheck">
              <label>
                <input
                  className="connectLayout_distributorcheckbox"
                  type="checkbox"
                />{" "}
                Register as {textTitle}
              </label>
            </div>
          </div>
          <Button
            className="common-squadButton"
            style={{ width: "fit-content", padding: "0rem 3rem" }}
            onClick={() => {
              if (account) {
                handleRegistration();
              } else {
                handleConnectMyAlgoConnectWallet();
              }
            }}
          >
            {account ? "MyAlgoConnect Connected" : "Connect MyAlgoConnect Wallet"}
          </Button>
          <p style={{ cursor: "pointer", color: "white" }}>
            Already have an account? <a href="/connect">Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
