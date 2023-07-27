import "../css/avatar.css";
import React, { useState, useEffect } from "react";
import { fetchUserThunk, updateUserThunk } from "../redux/user/user.actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Avatar = () => {
  const avatarArray = [
    "https://i.imgur.com/e96uSmb.jpg",
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.singleUser);

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     setAvatar(user.image);
  //   }
  // }, [user]);

  // const handleImageChange = (event) => {
  //   setAvatar(event.target.src);
  //   console.log("This is the avatar after it is set: ", avatar);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newAvatar = {
      image: event.target.src,
    };

    try {
      await dispatch(updateUserThunk(newAvatar));
      navigate("/user");
    } catch (error) {
      console.error(error);
    }
  };

  return avatarArray.map((avatar, index) => {
    return (
      <div key={index} className="avatar-element">
        <button onClick={handleSubmit} className="avatar-submit-btn">
          <img src={avatar} alt="user profile" className="avatar-image" />
        </button>
      </div>
    );
  });
};

export default Avatar;
