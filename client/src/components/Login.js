import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {

  let navigate = useNavigate();


  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username required.."),
    password: Yup.string().required("Password required.."),
  });

  const userLogin = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL_COMMENTS}/auth/login`, data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data);
          navigate("/");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-4 space-y-4 w-96 bg-white rounded shadow">
        <h1 className="text-2xl font-bold">Login</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={userLogin}
        >
          <Form className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium" htmlFor="username">
                Username
              </label>
              <Field
                className="mt-1 p-2 w-full border rounded-md"
                id="username"
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
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
