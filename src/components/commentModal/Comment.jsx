import { Modal, useMantineTheme } from "@mantine/core";
import "./Comment.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as CommentAction from "../../actions/CommentAction";
import Loader from "../loader/Loader";
import { format } from "timeago.js";

function Comment({ modelOpened, setModalOpened, data }) {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(() => {
    if (modelOpened && data?._id) {
      dispatch(CommentAction.getPostComment(data._id));
    }
  }, [modelOpened, data._id, dispatch]);

    const user = useSelector((state) => state.AuthReducer.authData);
    const { commenting, comments } = useSelector(
      (state) => state.CommentReducer
    );



  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      userId: user.data._id,
      postId: data._id,
      message: newComment,
    };
    if (newComment === "") {
      setError("please write your comment");
    } else {
      dispatch(CommentAction.addComment(commentData));
      setNewComment("");
      setError("");
    }
  };

  return (
    <>
      <Modal
        opened={modelOpened}
        onClose={() => setModalOpened(false)}
        overlayOpacity={0.55}
        overlayBlur={3}
        size={window.innerWidth >= 699 ? "55%" : "100%"}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        // style={{ backgroundColor: "gray" }}
      >
        {/* Modal content */}
        <div className="modal-body">
          {/* singlle post */}
          <div className="post">
            <div className="row-row">
              <img
                class="commenter-img"
                src={
                  data?.userId.profilePicture
                    ? PF + data?.userId.profilePicture
                    : PF + "default_profile.png"
                }
                alt=""
              />

              <h4 className="title">
                {data?.userId?.firstName + " " + data?.userId?.lastName}
              </h4>
            </div>
            <div className="detail">
              <span> {data.desc}</span>
            </div>

            <img src={data?.image ? PF + data?.image : ""} alt="" />
          </div>
          {/* list of comments */}
          <h4 className="title">Comments ({comments?.length})</h4>
          {comments?.length === 0 ? (
            <div style={{ margin: 10, padding: 10, alignItems: "center" }}>
              No Comments Yet
            </div>
          ) : (
            <div className="comment-list">
              {comments?.map((cmt) => {
                return (
                  <>
                    <div className="comment-row">
                      <img
                        className="commenter-img"
                        src={
                          process.env.REACT_APP_PUBLIC_FOLDER +
                          cmt?.profilePicture
                        }
                        alt=""
                      />
                      <div className="comment-column">
                        <span className="username">{cmt?.name}</span>
                        <span className="comment">
                          {cmt?.message}

                          <br />
                          <small className="time">
                            {" "}
                            {format(cmt?.createdAt)}
                          </small>
                        </span>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
          {/* add new comment */}
          <div className="new-comment">
            {/* <h4 className="title">Add New Comments</h4> */}
            <form action="" className="modal-form ">
              <span style={{ color: "red" }}>{error}</span>
              <div>
                <img
                  class="commenter-img"
                  src={
                    user?.data
                      ? process.env.REACT_APP_PUBLIC_FOLDER +
                        user?.data?.profilePicture
                      : ""
                  }
                  alt=""
                />

                <input
                  type="text"
                  className="modal-input"
                  name="comment"
                  placeholder="write your comment"
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                  required={true}
                />
                <button
                  type="submit"
                  className="button send-btn"
                  disabled={commenting}
                  onClick={handleCommentSubmit}
                >
                  {!commenting ? "Send" : <Loader data="" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default Comment;
