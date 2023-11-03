import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

// import { WalletProvider, useInitializeProviders, PROVIDER_ID } from '@txnlab/use-wallet'
// import { PeraWalletConnect } from '@perawallet/connect'
// import { DaffiWalletConnect } from '@daffiwallet/connect'

import Home from "./pages/home/Home";
import Signup from "./pages/auth/Signup";
import DistributorDashboard from "./pages/distributor/distributorDashboard/distributorDashboard";
import DistributorProduct from "./pages/distributor/distributorProduct/distributorProduct";
import Signin from "./pages/auth/Signin";
// import Retailer from "./pages/retailer/Retailer";
// import Profile from "./pages/profile/Profile";
// import Sidebar from "./components/sidebar/Sidebar";
// import LiveBidding from "./pages/retailer/livebidding/LiveBidding";
// import Distributor from "./pages/distributor/Distributor"

// import { useUserContext } from "./context/userContext";
import "./App.css";

function App() {
  // const { user } = useUserContext();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const providers = useInitializeProviders({
  //   providers: [
  //     { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
  //     { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
  //     { id: PROVIDER_ID.EXODUS }
  //   ]
  // })

  return (
    // <WalletProvider value={providers}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/dashboard" exact element={<DistributorDashboard />} />

          <Route path="/products" exact element={<DistributorProduct />} />
          {/*<Route path="/profile" exact element={
          <Sidebar>
            <Profile />
          </Sidebar>
         }
        />
        <Route path="/bidding" exact element={
          <Sidebar>
            <LiveBidding />
          </Sidebar>
         }
        />
        <Route path="/dashboard2" exact element={
          <Sidebar>
            <Distributor />
          </Sidebar>
         }
        />
      </Routes> */}
          {/* </Router> */}
          {/* ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect" element={<Signin />} />*/}

          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    // </WalletProvider>
  );
}

export default App;