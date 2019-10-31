// src https://codesandbox.io/s/QW1rqjBLl

import React from 'react';
import { withFormik } from 'formik';
import { EditorState } from 'draft-js';
// import { RichEditorExample } from './RichEditor';  // rename
import { DraftTextArea } from './DraftEditor';
import * as Yup from 'yup';
import { Debug } from './Debug'
import { RepoLinkBar } from '../util'

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    editorState: new EditorState.createEmpty(),
    email: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("That's not an email")
      .required('Required!'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // you probably want to transform draftjs state to something else, but I'll leave that to you.
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm',
});

const MyForm = ({
  values,
  touched,
  dirty,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  setFieldValue,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="email" style={{ display: 'block' }}>
      Email
    </label>
    <input
      id="email"
      placeholder="Enter your email"
      type="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {errors.email &&
    touched.email && (
      <div style={{ color: 'red', marginTop: '.5rem' }}>
        {errors.email}
      </div>
    )}
    <label
      htmlFor="email"
      style={{ display: 'block', marginTop: '.5rem' }}
    >
      Story
    </label>
    <DraftTextArea
      editorState={values.editorState}
      onChange={setFieldValue}
      onBlur={handleBlur}
    />
    <button
      type="button"
      className="outline"
      onClick={handleReset}
      disabled={!dirty || isSubmitting}
    >
      Reset
    </button>
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
    
    <Debug displayName="<FormikWithDraft>"/>
  </form>
);

const MyEnhancedForm = formikEnhancer(MyForm);

// stackblitz
//'https://stackblitz.com/edit/100ideas-formik-playground?file=components/DraftEditorFormik.js'
//
// base: `https://stackblitz.com/edit/100ideas-formik-playground?file=components/${name}.js`
//
// github
// `https://github.com/100ideas/100ideas-formik-playground/blob/master/components/DraftEditorFormik.js`
//
// base: `https://github.com/100ideas/100ideas-formik-playground/blob/master/components/${name}.js`


// const RepoLinkBar = ({srcName}) => 
//   <div className="repo-links">
//     <h5 className="src-link">
//       <a href={`https://github.com/100ideas/100ideas-formik-playground/blob/master/components/${srcName}.js`}>browse src</a>
//     </h5>
//     <h5 className="src-link">
//       <a href={`https://stackblitz.com/edit/100ideas-formik-playground?file=components/${srcName}.js`}>live edit</a>
//     </h5>
//   </div>


export const FormikWithDraft = () => (
  <div className="formik-draftjs" id="formik-draftjs">
    <div className="flexbar bm2">
      <h4>
        Using{' '}
        <a
          href="https://github.com/jaredpalmer/formik"
          target="_blank"
        >
          Formik
        </a>{' '}
        with{' '}
        <a href="https://draftjs.org/" target="_blank">
          Draft.js
        </a>
      </h4>
      <RepoLinkBar srcName='DraftEditorFormik' />
    </div>
    <p>
      This example (original <a href="https://codesandbox.io/s/QW1rqjBLl">codesandbox src</a>) shows to use Formik with Facebook's
      Draft.js. The Rich Text Editor is taken directly from
      the Draft.js examples directory. The trick is to lift
      editor state up to Formik instead of in the input
      class component and then use Formik's{' '}
      <code>setFieldValue</code> method to make state
      changes.{' '}
    </p>
    <MyEnhancedForm user={{ email: 'hello@reason.nyc' }} />
    
  </div>
);