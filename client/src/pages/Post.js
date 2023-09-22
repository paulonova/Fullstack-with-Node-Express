import React from 'react'
import { useParams } from 'react-router-dom'

function Post() {
  let {id} = useParams();
  return (
    <div>
      <h1>Post: {id}</h1>
    </div>
  )
}

export default Post


/**
 * The useParams() hook lets you retrieve these dynamic 
 * parameters as an object from within a component.
 * 
 * the {id} must match with the component ID name..
 */