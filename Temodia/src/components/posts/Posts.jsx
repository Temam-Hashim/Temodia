import "./Posts.css";
// import { PostData } from "../../data/postData";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimeLinePosts } from "../../actions/PostAction.js";
import * as POSTS from "../../api/PostRequest.js";
import Loader from "../loader/Loader";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Posts() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.authData);
  let { posts, loading } = useSelector((state) => state.PostReducer);
  // let [posts, setPosts] = useState([]);
  const params = useParams();

  // console.log(user.data.email);

  useEffect(() => {
    dispatch(getTimeLinePosts(user.data._id));
    // const getPosts = async () => {
    //   const myPosts = await POSTS.getTimeLinePosts(user.data._id);
    //   setPosts(myPosts.data);
    // };
    // getPosts();
  }, []);

  if (!posts) return "No Posts Found";
  if (params.id) posts = posts.filter((post) => post.userId._id === params.id);

  return (
    <div className="posts">
      {loading ? (
        <Loader data="Fetching Posts ..." />
      ) : (
        posts.map((post) => {
          return <Post data={post} key={post._id} />;
        })
      )}
    </div>
  );
}

export default Posts;
