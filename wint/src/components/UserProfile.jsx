import React from "react";

function UserProfile(){

    const handleImageError = (event) => {
        event.target.src = "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
    }
    return(
        <div>
        <h1>User Profile</h1>
        <img id="myImage" src="" onError={handleImageError} alt="Default Image" width="100" height="100"/>
        </div>
    );
}

export default UserProfile;