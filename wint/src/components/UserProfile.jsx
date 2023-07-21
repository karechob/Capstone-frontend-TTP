import React from "react";
import { useState } from "react";

function UserProfile() {
  const [UserName, setUserName] = useState("John Doe");
  //Default value of profile picture
  const [imgUrl, setimgUrl] = useState(
    "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
  );

  //Used to display a default profile picture
  //   const handleImageError = (event) => {
  //     event.target.src =
  //       "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg";
  //   };



  return (
    <div>
      <h1 style={{ display: "inline-block" }}>User Profile</h1>
      <button style={{ display: "inline-block", marginLeft: "10px" }}>
        Settings
      </button>
      <div style={{ textAlign: "center" }}>
        <img
          id="myImage"
          src={imgUrl}
          alt="Default Image"
          width="100"
          height="100"
        />
        <h3>Name: {UserName}</h3>
      </div>
      <button>Trips</button>
      <button>New Trip</button>
      <hr></hr>
      <p>*Other user Info*</p>
    </div>
  );
}

export default UserProfile;
