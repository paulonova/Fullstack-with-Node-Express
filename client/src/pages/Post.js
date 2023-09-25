import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'



function Post() {
  let {id} = useParams();
  const [postObject, setPostObject] = useState({});
  

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/${id}`)
    .then((response)=>{
      console.log("RESP: ", response.data)
      setPostObject(response.data);
    })
  },[])

  
  return (
<article className="container my-24 mx-auto md:px-6">
  <section className="mb-32 text-center">
    <div className="flex justify-center">
      <div className="max-w-[800px]">
        <h2 className="mb-12 text-5xl text-slate-800 font-bold tracking-tight md:text-6xl xl:text-7xl">
          {postObject.title}
        </h2>
        <p className="text-lg text-neutral-500">
          {postObject.postText}
        </p>
        <p className="text-sm text-slate-800">
          Author: {postObject.userName}
        </p>
      </div>
    </div>
  </section>
  <div>

  </div>
</article>
  )
}

export default Post


/**
 * The useParams() hook lets you retrieve these dynamic 
 * parameters as an object from within a component.
 * 
 * the {id} must match with the component ID name..
 */


/**
 * <div className='leftSide'>
        <div className='post' id="individual">
          <div className='title'>{postObject.title}</div>
          <div className='postText'>{postObject.postText}</div>
          <div className='footer'>{postObject.userName}</div>
        </div>
        
      </div>
      <div className='rightSide'>

      </div>
 * 
 */