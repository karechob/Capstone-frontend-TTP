import React from "react";
import "../css/home.css";
import video from "../assets/videos/home_background2.mp4";
import "../fonts/NeueKonstantGrotesk-Book.otf";

function Home() {
  return (
    <div className="home-container">
      <video className="background-video" autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <div className="background-animation"></div>
      <div className="welcome-message">
        <p className="header">Welcome to Wint! </p>
        <p className="description">
          Embark on an unforgettable journey while keeping your wallet happy. At
          Wint, we understand your love for travel and the importance of making
          the most of your hard-earned money. Whether you're a penny-pincher, a
          thrifty explorer, or simply seeking incredible adventures without
          breaking the bank, you've come to the right place.
        </p>
      </div>
    </div>
  );
}

export default Home;
