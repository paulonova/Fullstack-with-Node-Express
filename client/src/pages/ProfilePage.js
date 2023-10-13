import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ProfilePage() {

  let {id} = useParams();
  const [userName, setUserName] = useState('')

  //http://localhost:3001/auth/userinfo/1

  useEffect(()=>{
    axios.get(`http://localhost:3001/auth/userinfo/${id}`)
    .then((response)=>{
      setUserName(response.data.username)
    })
  })


  return (
    <div>
      <div className='text-3xl mt-10'>
        <h1>User name: {userName}</h1>
      </div>
      <div className='text-left mt-10'>
        Basic Info: 
      </div>

    </div>
  )
}

export default ProfilePage
