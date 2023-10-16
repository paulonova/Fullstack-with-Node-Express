import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { AuthContext } from "../helpers/AuthContext";

function ProfilePage() {
  let { id } = useParams();
  const [userName, setUserName] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/userinfo/${id}`).then((response) => {
      setUserName(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
      console.log("POSTS: ", listOfPosts)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="text-3xl mt-10">
        <h1><small>Posted by:</small> {userName}</h1>
        <div>
          {authState.username === userName && 
            <Link className="btn text-sm mt-10 !p-2" to="/changepassword">Change my Password </Link>
          }
        </div>
      </div>
      <div className="text-left mt-10">List of Posts</div>

      <div className="flex justify-center flex-wrap">
        {listOfPosts.map((post, key) => {
          return (
            <div
              className="m-5 text-white w-[250px] bg-slate-500 relative"
              key={key}
            >
              <div
                className="h-[230px] p-5 mt-2 cursor-pointer"
              >
                <h2 className="text-[30px] text-center">{post.title}</h2>
                <p>{post.postText}</p>
              </div>
              <div className="bg-slate-700 flex justify-between items-baseline p-3 absolute w-[100%] bottom-0 left-0">
                <Link to={`/profile/${post.PostId}`}><p>{post.userName}</p></Link>
                <div className="flex">
                  <label className="mr-2">{post.Likes.length}</label>
                  {post.Likes.length !== 0 ? 
                  <button ><AiFillLike/></button>
                  : 
                  <button ><AiOutlineLike/></button>
                }               
                </div>
              </div>
            </div>
          );

        })}
      </div>
    </div>
  );
}

export default ProfilePage;
