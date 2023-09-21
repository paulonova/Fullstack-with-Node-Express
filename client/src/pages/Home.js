import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const baseUrl = "http://localhost:3001/posts";

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(()=>{
    axios.get(baseUrl)
    .then((response)=>{
      console.log("RESP: ", response.data)
      setListOfPosts(response.data);
    })
    
  }, [])

  return (
    <div className="flex justify-center">
      {listOfPosts.map((value, key) => {
        return(
          <div className='m-5 text-white' key={key}>
            <div className='bg-slate-500 p-5'>
              <h2 className='text-[30px] text-center'>{value.title}</h2>
              <p>{value.postText}</p>
              <p className='text-sm'>Author: {value.userName}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
