import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import PostPopup from "./Popup";

function UserProfile({ users, posts, timeZone }) {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [hours, setHours] = useState(0);
  const [minutes, setMunutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const userPosts = posts?.filter(post => post.userId === data?.id);

  useEffect(() => {
    setHours(new Date(timeZone?.datetime).getHours());
    setMunutes(new Date(timeZone?.datetime).getMinutes());
    setSeconds(new Date(timeZone?.datetime).getSeconds());
  }, [timeZone])

  useEffect(() => {
    let interval;
    if (isStart) {
      interval = setInterval(() => {
        setSeconds(seconds + 1)
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isStart, seconds])

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMunutes(minutes + 1);
    }
    if (minutes === 60) {
      setMunutes(0);
      setHours(hours + 1)
    }
  }, [seconds, minutes, hours])

  console.log(seconds)

  const onClose = () => {
    setOpen(false);
    setSelectedPost({});
  };
  const onPostClick = (post) => {
    setOpen(true);
    setSelectedPost(post);
  };
  const onBack = () => {
    navigate("/");
  };

  return (
    <>
      {data && (
        <div className="user-profile">
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={onBack}>Back to Directory</button>

            <div className="profileText">
              <h3>Profile Page</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ backgroundColor: "black", color: "white", padding: "10px", borderRadius: "10px" }}>{hours}:{minutes}:{seconds}</div>
              <button onClick={() => setIsStart(!isStart)}>start/pause</button>
            </div>
          </div>
          <div className="user-details">
            <div>
              <p>{data.name}</p>
              <p>{data.username}</p>
              <p>{data.catchPhrase}</p>
            </div>
            <div>
              {/* <p>{data.address}</p> */}
              <p>{data.email}</p>
              <p>{data.phone}</p>
            </div>
          </div>

          <div className="user-posts">
            {userPosts?.map((post, index) => (
              <div
                className="post"
                key={index}
                onClick={() => onPostClick(post)}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
          {open && <PostPopup onClose={onClose} post={selectedPost} />}
        </div>
      )}
    </>
  );
}

export default UserProfile;
