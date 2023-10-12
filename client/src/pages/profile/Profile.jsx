import React, { useEffect, useState } from "react";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/userContext";

import avatar_pic from "../../assets/avatar2.png";
import cover_pic from "../../assets/cover.jpg";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <div className="profile-main">
      <div className="profileedit">
        <h1>My Profile</h1>
        {/* <div className="profileeditbtn">Edit Profile</div> */}
      </div>

      <div className="profile-banner">
        <div className="profile-header">
          <div className="profile-cimg">
            <img className="coverpic" src={cover_pic} alt="Cover Picture" />

            <FontAwesomeIcon className="pencilicon" icon={faPenToSquare} />
          </div>
          <div className="profile-details">
            <div className="profileleft">
              <div className="profile-img">
                <img src={avatar_pic} alt="avatar" className="avatar" />
                <span className="pencilicon2">
                  <FontAwesomeIcon icon={faPenToSquare} className="light" />
                </span>
              </div>
              <div className="profiletxt">
                <p className="profilename">{user.name}</p>
                <p className="profileposition">Retailer</p>
              </div>
            </div>
            <div className="profilesocials">
              <div className="socialgit">
                <img src={github} alt="GitHub" />
              </div>

              <div className="sociallink">
                <img src={linkedin} alt="LinkedIn" />
              </div>
            </div>
          </div>
        </div>        
        <div className="profileabout">
          <h2>About</h2>
          <div className="profileaboutcard">
            <p>You haven't added any about me yet</p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Profile;
