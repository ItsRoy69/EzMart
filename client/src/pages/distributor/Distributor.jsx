import { useState, useEffect } from "react";

import "./distributor.css";
import feed_avatar from "../../assets/avatar2.png";
import landingIntro from "../../assets/landing-intro.png";
import searchimg from "../../assets/search.svg";
import profile_pic from "../../assets/avatar2.png";
import peer from "../../assets/peer.svg";
import writePost from "../../assets/writePost.svg";
import { useUserContext } from "../../context/userContext";
import axios from "axios";
import { Backdrop } from "../../components/backdrop/Backdrop";
import { motion } from "framer-motion";
import land_grad from "../../assets/land-grad.png";

const Distributor = () => {
  const { user } = useUserContext();
  const [modal, setModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState("");
  const [deal, setDeal] = useState(0);
  const [biddingValue, setBiddingValue] = useState(0);

  console.log("debugging cards===>", cards);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="dashboard" id={modal ? "blurr" : null}>
      <div className="dashboard-main">
        <div className="welcome-head">
          <h1>Welcome, Distributor</h1>
        </div>

        <div className="feed-search">
          <h3>Feed Search</h3>
          <div className="inputbox">
            <div className="inputx">
              <img
                src={searchimg}
                alt="search"
                style={{ borderStyle: "none", verticalAlign: "middle" }}
              />
              <input
                type="text"
                placeholder="Type the skills you are looking for"
              />
            </div>
            <div className="searchbtn">Search</div>
          </div>
          <div className="intro-graphic">
            <img className="intro-right" src={landingIntro} alt="" />
          </div>
        </div>
        {cards.length > 0 &&
          cards.map((post, index) => (
            <div key={index} className="feed-card">
              {" "}
              <div className="delete-card"></div>
              <div className="feed-cardleft">
                <img src={feed_avatar} alt="Avatar" className="feed_avatar" />
              </div>
              <div className="feed-cardright">
                <p className="feed-name">{post.title}</p>
                {/* <p className="feed-time">12.43.415</p> */}
                <div className="feed-description">
                  <p className="feed-title">Product type : {post.product}</p>
                  <div className="feedskills">
                    <p>Quantity Required : {post.quantity}</p>
                  </div>
                </div>
              </div>
              <div className="feed-cardbottom">
                <div
                  className="feed-cardbtn"
                  onClick={() => {
                    setModal(post);
                    setTitle(post.title);
                    setProduct(post.product);
                    setQuantity(post.quantity);
                  }}
                >
                  <p>Bid</p>
                </div>
              </div>
            </div>
          ))}

        {modal && (
          <Backdrop onClick={() => setModal(false)}>
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="teamfindercardbody">
                <img
                  className="teamfindercardbg"
                  src={land_grad}
                  alt="gradient"
                />
                <div className="teamfindercontent">
                  <h1>Confirm Your Deal</h1>
                  <form action="" className="teamfinderform">
                    <div className="teamfinderinputs">
                      <h4>Your Deal : </h4>
                      <div className="inputbox">
                        <input
                          name="title"
                          placeholder="Rs"
                          type="number"
                          value={biddingValue}
                          onChange={(e) =>
                            setBiddingValue(parseInt(e.target.value, 10))
                          }
                          required
                        />
                      </div>
                    </div>
                  </form>
                  <div className="teamfindersubmit">
                    <div
                      type="submit"
                      id="sb"
                      className="teamsubmit"
                      onClick={async () => {
                        console.log("Data to be sent:", {
                          title,
                          product,
                          quantity,
                          deal: biddingValue,
                        });

                        try {
                          await axios.post(
                            "http://localhost:5000/deals/create-deal",
                            {
                              title,
                              product,
                              quantity,
                              deal: biddingValue,
                            }
                          );
                          console.log("Deals created successfully!");

                          const response = await axios.get(
                            "http://localhost:5000/posts"
                          );
                          setCards(response.data);
                        } catch (error) {
                          console.error("Error creating deals:", error);
                        }
                        setBiddingValue(0);
                        setModal(false);
                      }}
                    >
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </div>

      <div className="dashboard-summary">
        <div className="profile">
          <div className="profile-summary">
            <h1>Profile</h1>
            <img src={profile_pic} alt="avatar" className="profile-pic" />
            <p className="username">{user.name}</p>

            <p className="title">Distributor</p>
          </div>

          <div className="profile-stats">
            <div className="profile-card">
              <img src={peer} alt="Peers" className="profileicon" />
              <div className="profilestats">
                <p className="profilecount">12</p>
                <p className="profilecount-sub">Products</p>
              </div>
            </div>
            <div className="profile-card">
              <img src={writePost} alt="Posts" className="profileicon" />
              <div className="profilestats">
                <p className="profilecount">{cards.length}</p>
                <p className="profilecount-sub">Posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distributor;
