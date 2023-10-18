import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function UserCard({ user, posts }) {
  const navigate = useNavigate();
  const navigateToContacts = (userData) => {
    let path = "/user/:id".replace(":id", userData.id);
    navigate(path, { state: userData });
  };

  return (
    <div style={{ border: "1px solid", textAlign: "center" }}>
      <h3>Directory</h3>
      {user?.map((item, index) => {
        const userPosts = posts?.filter(post => post.userId === item.id)
        return (
          <div
            key={index}
            className="user-card"
            onClick={() => navigateToContacts(item)}
            style={{
              display: "flex",
              border: "1px solid",
              padding: "10px",
              margin: "5px",
              justifyContent: "space-between",
            }}
          >
            <div className="user-name">{item.name}</div>
            <div className="user-posts-count">Posts: {userPosts?.length} </div>
          </div>
        )
      })}
    </div>
  );
}

export default UserCard;
