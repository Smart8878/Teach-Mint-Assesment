import React from "react";
import UserCard from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import PageNotFound from "./components/pageNotFound";
import useApi from "./customHooks/useApi";

function App() {
  const Users = useApi("https://jsonplaceholder.typicode.com/users");
  const Posts = useApi("https://jsonplaceholder.typicode.com/posts");
  const timeZone = useApi("http://worldtimeapi.org/api/timezone/America/Argentina/Salta");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<UserCard users={Users.data} posts={Posts.data} />}></Route>
        <Route path="/user/:id" element={<UserProfile users={Users.data} posts={Posts.data} timeZone={timeZone.data} />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
