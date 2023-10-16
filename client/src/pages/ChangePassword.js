import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ChangePassword() {

  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Password required.."),
    newPassword: Yup.string().required("Password required.."),
  });

  const changePassword = (data) => {
    axios.put("http://localhost:3001/auth/changepassword", {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }else{
          navigate("/");
        }
      });
      
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-4 space-y-4 w-96 bg-white rounded shadow">
        <h1 className="text-2xl font-bold">Change you password</h1>
        <Formik
          initialValues={{ oldPassword: "", newPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={changePassword}
        >
          <Form className="space-y-4 text-left">
          
            <div>
              <label className="block text-sm font-medium" htmlFor="password">
                Old Password
              </label>
              <Field
                className="mt-1 p-2 w-full border rounded-md"
                id="oldPassword"
                name="oldPassword"
                type="text"
              />
              <ErrorMessage
                name="oldPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="password">
                New Password
              </label>
              <Field
                className="mt-1 p-2 w-full border rounded-md"
                id="newPassword"
                name="newPassword"
                type="text"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Change Password
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ChangePassword;
