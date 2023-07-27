import "../css/avatar.css";
import React from "react";

const Avatar = () => {
  const avatarArray = [
    "https://i.imgur.com/ILNEfjt.png",
    "https://i.imgur.com/TF9TEjr.png",
    "https://i.imgur.com/dpMYaXu.png",
    "https://i.imgur.com/Y412yO8.png",
    "https://i.imgur.com/7P3Ncsk.png",
    "https://i.imgur.com/ky6Fjc0.png",
    "https://i.imgur.com/WnjTXAa.png",
    "https://i.imgur.com/BWasaAA.png",
    "https://i.imgur.com/8laaP4z.png",
    "https://i.imgur.com/Ed34k87.png",
    "https://i.imgur.com/xUW73LZ.jpg",
    "https://i.imgur.com/RnzsTJw.jpg",
    "https://i.imgur.com/oCdKdbc.jpg",
  ];

  return avatarArray.map((avatar) => {
    return (
      <div className="avatar-element">
        <img src={avatar} alt="user profile" className="avatar-image" />
      </div>
    );
  });
};

export default Avatar;
