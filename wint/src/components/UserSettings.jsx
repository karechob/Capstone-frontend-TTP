import React from "react";

function UserSettings() {
  return (
    <>
      <h1>Edit User</h1>
      
      <form>
        <label htmlFor="userName">User Name:</label>
        <input type="text" id="userName" />
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" />
        <br></br>
        <button type="submit">Done</button>
      </form>
    </>
  );
}

export default UserSettings;
