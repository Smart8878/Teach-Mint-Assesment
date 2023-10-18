import React from "react";
import "../App.css";

function PostPopup({ post, onClose }) {
  return (
    <div className="post-popup" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default PostPopup;
