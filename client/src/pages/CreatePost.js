import React, { useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";


function CreatePost() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: ""
  }

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema= Yup.object().shape({
    title: Yup.string().required("Title är obligatoriskt fält"),
    postText: Yup.string().required("Post är obligatoriskt fält")
  })

  const onSubmit=(data)=>{
    axios.post(process.env.REACT_APP_BASE_URL , data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) =>{
      console.log("Worked! : ", response.data);
      navigate('/');
    })
    
  }

  return (
    <div className="createPostPage">
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}>
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span"/>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />

          <label>Post: </label>
          <ErrorMessage name="postText" component="span"/>
          <Field
            component="textarea"
            rows="5" 
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Text..)"
          />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;

/**
 * <Field id="inputCreatePost" name="title"/>
 * The name must be exact the same name I use in dabase column.
 * In this case I will handle the Title, so in name I need to write name="title"
 *
 * FORMIK ***
 * With Formik I don´t need to set any state to store the input data, Formik handle this for me, 
 * all I need is to pass the initialValues.
 */
