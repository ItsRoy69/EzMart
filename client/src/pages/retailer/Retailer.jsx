import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Backdrop } from "../../components/backdrop/Backdrop";
import land_grad from "../../assets/land-grad.png";
import "./retailer.css";
import feed_avatar from "../../assets/avatar2.png";
import findATeammate from "../../assets/business-need.svg";
import landingIntro from "../../assets/landing-intro.png";
import searchimg from "../../assets/search.svg";
import profile_pic from "../../assets/avatar2.png";
import peer from "../../assets/peer.svg";
import writePost from "../../assets/writePost.svg";
import { useUserContext } from "../../context/userContext";
import axios from "axios";

const Retailer = (post) => {
  const { user } = useUserContext();
  const [modal, setModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState("");
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
          <h1>Welcome, Retailer</h1>
        </div>
        <div className="finder">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="finder-box"
            onClick={() => setModal(true)}
          >
            <img src={findATeammate} alt="Find my products" />
            <p>
              <span className="find">Find</span>
              <br /> Products
            </p>
          </motion.div>
        </div>
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
                  <h1>Ask your requirements</h1>
                  <form action="" className="teamfinderform">
                    <div className="teamfinderinputs">
                      <h4>Title : </h4>
                      <div className="inputbox">
                        <input
                          name="title"
                          placeholder="Speceify your need"
                          type="text"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="teamfinderinputs">
                      <h4>Product : </h4>
                      <div className="inputbox">
                        <input
                          name="product"
                          placeholder="Enter your product name"
                          type="text"
                          value={product}
                          onChange={(e) => {
                            setProduct(e.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="teamfinderskills">
                      <div className="teamfinderskillhead">
                        <h4>Quantity : </h4>
                        <div className="inputbox">
                          <input
                            name="quantity"
                            placeholder="Enter the quantity of the product you are looking for"
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                              setQuantity(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="teamfindersubmit">
                    <div
                      type="submit"
                      id="sb"
                      className="teamsubmit"
                      onClick={async () => {
                        setCards([...cards, { title, product, quantity }]);
                        setTitle("");
                        setProduct("");
                        setQuantity(0);
                        setModal(false);

                        try {
                          await axios.post(
                            "http://localhost:5000/posts/create-post",
                            {
                              title,
                              product,
                              quantity,
                            }
                          );
                          console.log("Post created successfully!");
                        } catch (error) {
                          console.error("Error creating post:", error);
                        }
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
              {/* Add 'key' prop with 'index' */}
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
            </div>
          ))}
      </div>

      <div className="dashboard-summary">
        <div className="profile">
          <div className="profile-summary">
            <h1>Profile</h1>
            <img src={profile_pic} alt="avatar" className="profile-pic" />
            <p className="username">{user.name}</p>

            <p className="title">Retailer</p>
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

export default Retailer;
