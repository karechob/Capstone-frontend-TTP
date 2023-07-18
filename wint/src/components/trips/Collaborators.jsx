import React from "react";
import defaultpic1 from "../trips/userdefault1.jpeg";
import defaultpic2 from "../trips/userdefault2.jpeg";
import defaultpic3 from "../trips/userdefault3.jpeg";

//function will be changed so it reads an array if users, the individual divs below are just placeholders
function Collaborators() {
  return (
    <div className="collaborators-container">
      <div className="collaborator-image">
        <img
          className="collaborator-indiv-img"
          src={defaultpic1}
          alt="default-pic"
        />
        <h2>UserName</h2>
        <h3>Budget: $1000</h3>
        <button className="remove-user-btn">X</button>
      </div>
      <div className="collaborator-image">
        <img
          className="collaborator-indiv-img"
          src={defaultpic2}
          alt="default-pic"
        />
        <h2>UserName</h2>
        <h3>Budget: $1000</h3>
        <button className="remove-user-btn">X</button>
      </div>

      <div className="collaborator-image">
        <img
          className="collaborator-indiv-img"
          src={defaultpic3}
          alt="default-pic"
        />
        <h2>UserName</h2>
        <h3>Budget: $1000</h3>
        <button className="remove-user-btn">X</button>
      </div>
    </div>
  );
}

export default Collaborators;
