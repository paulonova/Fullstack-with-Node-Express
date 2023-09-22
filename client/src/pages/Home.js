import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(()=>{
    axios.get(process.env.REACT_APP_BASE_URL)
    .then((response)=>{
      console.log("RESP: ", response.data)
      setListOfPosts(response.data);
    })
    
  }, [])

  return (
    <div className="flex justify-center flex-wrap">
      {listOfPosts.map((value, key) => {
        return(
          <div className='m-5 text-white cursor-pointer' key={key} onClick={() => navigate(`/post/${value.id}`)}>
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
