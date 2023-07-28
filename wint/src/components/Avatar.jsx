import "../css/avatar.css";
import React, { useEffect } from "react";
import { fetchUserThunk, updateUserThunk } from "../redux/user/user.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Avatar = () => {
  const avatarArray = [
    "https://i.imgur.com/ILNEfjt.png",
    "https://i.imgur.com/TF9TEjr.png",
    "https://i.imgur.com/dpMYaXu.png",
    "https://i.imgur.com/Y412yO8.png",
    "https://i.imgur.com/DToTkDh.png",
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

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

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
