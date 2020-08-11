import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/headers/Header";
import Post from "./components/post/Post";
import { db } from "./firebase";
import Upload from "./components/image_upload/ImageUpload";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    //j
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  function getUsername(username) {
    setUser(username);
  }
  return (
    <div>
      <Header getUsername={getUsername} />

      <div className="app_post">
        {posts.map(({ id, post }) => (
          <Post
            user={user}
            key={id}
            postId={id}
            username={post.username}
            imgUrl={post.imgUrl}
            caption={post.caption}
          />
        ))}
      </div>

      {user ? (
        <Upload username={user} />
      ) : (
        <h3>Sorry you need to login before upload</h3>
      )}
    </div>
  );
}
