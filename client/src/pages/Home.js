import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import LikeButton from "../components/LikeButton";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL).then((response) => {
      console.log("RESP: ", response.data);
      setListOfPosts(response.data);
    });
  }, []);

  const likeAPost = (postId) => {
    axios.post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {

            if (post.id === postId) {
              if(response.data.liked){
                return { ...post, Likes: [...post.Likes, 0] };
              }else{
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray};
              }
              
              
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div className="flex justify-center flex-wrap">
      {listOfPosts.map((post, key) => {
        return (
          <div className="m-5 text-white w-[250px] " key={key}>
            <div
              className="bg-slate-500 p-5 cursor-pointer"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <h2 className="text-[30px] text-center">{post.title}</h2>
              <p>{post.postText}</p>
            </div>
            <div className="bg-slate-700 flex justify-between p-3">
              <p>{post.userName}</p>
              <div>
                <label className="mr-2">{post.Likes.length}</label>
                {console.log("LIKED: ", post.isLiked)}
                  <LikeButton postId={post.id} isLiked={post.isLiked} likePost={likeAPost} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
