import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "../../firebase";
import firebase from "firebase";

function Post({ imgUrl, user, username, caption, postId }) {
  ///Comments/////
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  /////

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className="post_img" src={imgUrl} alt="post" />
      <h4 className="post_text">
        <strong>{username}</strong> &nbsp; {caption}
      </h4>
      {/* Show Comment */}
      <div className="show_comment">
        {comments.map((comment) => (
          <p className="comment">
            <strong> &nbsp;{comment.username}</strong> &nbsp; {comment.text}
          </p>
        ))}
      </div>

      <form className="post_comment">
        <input
          className="post_input"
          type="text"
          placeholder="add comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          disabled={!comment}
          className="post_btn"
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
