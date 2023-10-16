import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";
import { AuthContext } from "../helpers/AuthContext";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  let navigate = useNavigate();
  //Check if I am logged in!
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios
      .get(`${process.env.REACT_APP_BASE_URL_COMMENTS}/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addComment = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL_COMMENTS}/comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log("ERROR: ", response.data.error);
          alert(response.data.error);
        } else {
          //Update the list automatic...
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((value) => {
            return value.id !== id;
          })
        );
      });
  };

  const deletePost = (postId) =>{
    axios.delete(`http://localhost:3001/posts/${postId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then(() => {
        alert("Post Deleted Successfully!");
      });
      navigate("/");
  }

  const editPost = (option) => {
    if (option === 'title') {
      let newTitle = prompt("Enter new title!", postObject.title);
      
      // Check if newTitle is not null and not an empty string
      if (newTitle !== null && newTitle !== "") {
        axios.put(`http://localhost:3001/posts/title`, { newTitle: newTitle, id: id }, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        });
        setPostObject({ ...postObject, title: newTitle });
      } 

    } else {
      console.log("BODY");
      let newPostText = prompt("Enter new post text!", postObject.postText);
  
      // Check if newPostText is not null and not an empty string
      if (newPostText !== null && newPostText !== "") {
        axios.put(`http://localhost:3001/posts/postText`, { newText: newPostText, id: id }, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        });
        setPostObject({ ...postObject, postText: newPostText });
      } 
    }
  }
  

  return (
    <article className="container py-[50px] mx-auto md:px-6 bg-white">
      <section className="mb-32 text-center">
        <div className="flex justify-center">
          <div className="max-w-[800px]">
            <h2 onClick={()=> {if(authState.username === postObject.userName){
              editPost('title')}}} className="inline-block mb-12 text-5xl text-slate-800 font-bold tracking-tight md:text-6xl xl:text-7xl">
              {postObject.title}
            </h2>
            <p onClick={()=> {if(authState.username === postObject.userName){
              editPost('body')}}} className="inline-block text-lg text-neutral-500">{postObject.postText}</p>
            <p className="text-sm text-slate-800">
              Author: {postObject.userName}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-5">
          {authState.username === postObject.userName && 
            <div onClick={()=>{deletePost(postObject.id)}} className="btn w-[150px] flex justify-between items-center cursor-pointer">
              <BsTrash/>
              <button className=""> Delete Post</button>
            </div>
          }
          
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
                className="my-8 border border-gray-400 p-5 bg-gray-300 hover:shadow-xl flex justify-between items-center"
                key={key}
              >
                <div className="mb-3">
                  <p>
                    <small>Author: {comment.username}</small>
                  </p>
                  <p>{comment.commentBody}</p>
                </div>

                <div className="items-end">
                  {authState.username === comment.username && (
                    <button
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                      className="text-slate-800 hover:text-slate-500"
                    >
                      <BsFillTrashFill />
                    </button>
                  )}
                </div>
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
