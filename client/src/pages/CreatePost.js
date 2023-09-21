import React from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik';

function CreatePost() {
  return (
    <div>
      <Formik initialValues="" onSubmit="" validationSchema="">
        <Form>
          <Field id="inputCreatePost" name="title"/>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost


/**
 * <Field id="inputCreatePost" name="title"/>
 * The name must be exact the same name I use in dabase column.
 * In this case I will handle the Title, so in name I need to write name="title"
 * 
 */