import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios
      .get(`${process.env.REACT_APP_BASE_URL_COMMENTS}/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      });
  }, []);

  const addComment = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL_COMMENTS}/comments`, {
          commentBody: newComment,
          PostId: id,
        }, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log("ERROR: ", response.data.error);
          alert(response.data.error)
        } else {
          //Update the list automatic...
          const commentToAdd = { commentBody: newComment, username: response.data.username};
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  return (
    <article className="container py-[50px] mx-auto md:px-6 bg-white">
      <section className="mb-32 text-center">
        <div className="flex justify-center">
          <div className="max-w-[800px]">
            <h2 className="mb-12 text-5xl text-slate-800 font-bold tracking-tight md:text-6xl xl:text-7xl">
              {postObject.title}
            </h2>
            <p className="text-lg text-neutral-500">{postObject.postText}</p>
            <p className="text-sm text-slate-800">
              Author: {postObject.userName}
            </p>
          </div>
        </div>
      </section>

      <section className="text-left">
        <div>
          <h3>Add Comment</h3>
          <div className="flex justify-between ">
            <textarea
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border border-gray-400 p-2"
              value={newComment}
              rows="3"
              placeholder="Comments..."
              autoComplete="off"
            />
            <button onClick={addComment} className="btn ml-2">
              Add Comments
            </button>
          </div>
        </div>
        <div className="mt-10">
          <h3>All Comments</h3>
          {comments.map((comment, key) => {
            return (
              <div
                className="my-8 border border-gray-400 p-5 bg-gray-300 hover:shadow-xl"
                key={key}
              >
                <div className="mb-3">
                  <p><small>Author: {comment.username}</small></p>
                </div>
                <p>{comment.commentBody}</p>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}

export default Post;

/**
 * The useParams() hook lets you retrieve these dynamic
 * parameters as an object from within a component.
 *
 * the {id} must match with the component ID name..
 */
