import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LikeButton from "../components/LikeButton";



function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();
  const[likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL, { 
      headers: { accessToken: localStorage.getItem("accessToken") } 

    }).then((response) => {
      setListOfPosts(response.data.listOfPosts);
      console.log("LikedPosts1: ", response.data.likedPosts);
      setLikedPosts(response.data.likedPosts.map((like) =>{return like.PostId}));      
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
        // Change icon when click logic
        if(likedPosts.includes(postId)){
          setLikedPosts(likedPosts.filter((id) => {
            return id !== postId;
          }))
        }else{
          setLikedPosts([...likedPosts, postId])
        }
      });
  };

  return (
    <div className="flex justify-center flex-wrap">
      {listOfPosts.map((post, key) => {
        return (
          <div className="m-5 text-white w-[250px] bg-slate-500 relative" key={key}>
            <div className="h-[230px] p-5 mt-2 cursor-pointer"
              onClick={() => navigate(`/post/${post.id}`)}>
              <h2 className="text-[30px] text-center">{post.title}</h2>
              <p>{post.postText}</p>
            </div>
            <div className="bg-slate-700 flex justify-between items-baseline p-3 absolute w-[100%] bottom-0 left-0">
              <p>{post.userName}</p>
              <div className="flex">
                <label className="mr-2">{post.Likes.length}</label>
                <LikeButton postId={post.id} likedPosts={likedPosts} likePost={likeAPost} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
