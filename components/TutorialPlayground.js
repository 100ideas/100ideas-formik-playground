import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from 'yup';
import { Debug } from './Debug'

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const SignupFormPlay = () => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', acceptedTerms: false }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .min(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .min(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email addresss`')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    > 
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
        <Form id="SignupFormPlay">
          <h4><code>{"<TutorialPlayground>:"}</code> playing around w/ code from the <a href={"https://jaredpalmer.com/formik/docs/tutorial#leveraging-react-context"}>official tutorial</a></h4>

          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Smith"
          />

          <MyTextInput
            label="email"
            name="email"
            type="email"
            placeholder=""
          />
          
          <button type="submit" style={{display: "block"}}>Submit</button>

          <Debug displayName="<TutorialPlayground>"/>
        </Form>
        );
      }}
    </Formik>
  );
};