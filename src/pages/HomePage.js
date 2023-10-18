import React from "react";
import UserCard from "../components/UserCard";
import "../App.css";

const Landingpage = ({ users, posts }) => {

  return (
    <div className="App">
      <UserCard user={users} posts={posts} />
    </div>
  );
};

export default Landingpage;
