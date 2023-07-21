import { useSelector} from "react-redux";

function UserProfile() {
  const user = useSelector(state => state.user.singleUser);
  console.log("This is the user's info: ", user);

  //Used to display a default profile picture
  //   const handleImageError = (event) => {
  //     event.target.src =
  //       "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg";
  //   };
  return (
    <div>
      <h1 style={{ display: "inline-block" }}>{user.name}</h1>
      <button style={{ display: "inline-block", marginLeft: "10px" }}>
        Settings
      </button>
      <div style={{ textAlign: "center" }}>
        <img
          id="myImage"
          src= {user.image}
          alt="user avatar"
          width="200"
          height="200"
        />
        <h3>Username: {user.username}</h3>
      </div>
      <button>Trips</button>
      <button>New Trip</button>
      <hr></hr>
      <p>*Other user Info*</p>
    </div>
  );
}

export default UserProfile;
