import React from 'react'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";


function LikeButton({postId, likedPosts, likePost}) {
  return (
    <div>
      {!likedPosts.includes(postId) ? (
        <button onClick={()=> likePost(postId)}><AiOutlineLike/></button>
      ) : (
        <button onClick={()=> likePost(postId)}><AiFillLike/></button>
      )}
    </div>
  )
}

export default LikeButton
