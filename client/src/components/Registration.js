import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Registration() {

  const [userName, setUserName] = useState('')
  const [passWord, setPassword] = useState('')

  const initialValues ={
    username: "",
    password: ""
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Required"),
    password: Yup.string().min(8, "Must be at least 8 characters")
    .max(16, "Must be max 16 characters").required("Required"),
  });

  const onSubmit=(data)=>{
    axios.post(`${process.env.REACT_APP_BASE_URL_COMMENTS}/auth`, data)
    .then(()=>{
      console.log("User: ", data);
      setPassword('');
      setUserName('');
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-4 space-y-4 w-96 bg-white rounded shadow">
        <h1 className="text-2xl font-bold">Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium" htmlFor="username">
                  Username
                </label>
                <Field
                  className="mt-1 p-2 w-full border rounded-md"
                  id="username"
                  placeholder="(Ex. John316...)"
                  name="username"
                  type="text"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <Field
                  className="mt-1 p-2 w-full border rounded-md"
                  id="password"
                  placeholder="Your password..."
                  name="password"
                  type="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
