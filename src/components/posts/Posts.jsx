import "./Posts.css";
// import { PostData } from "../../data/postData";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimeLinePosts } from "../../actions/PostAction.js";
import Loader from "../loader/Loader";
import { useParams } from "react-router-dom";

function Posts() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.authData?.data);
  let { posts, loading } = useSelector((state) => state.PostReducer);
  const params = useParams();
  console.log("latest posts: " + posts)


  useEffect(() => {
    dispatch(getTimeLinePosts(user._id));
  }, [dispatch, user, user._id]);

  if (!posts) return "No Posts Found";
  if(loading) return "Loading your posts...";
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
