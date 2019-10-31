import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "./styles.css";
import "./styles-draftjs.css";
import "./styles-custom.css";

import { Debug } from './components/Debug'

import { SignupFormPlay } from './components/TutorialPlayground'
import { FinalSignupForm } from './components/FormikTutorialFinal'
import { FastFieldDIY } from './components/FastFieldDIY'
import { FormikWithDraft } from './components/DraftEditorFormik'
import { MoreResources } from './docs/MoreResources'


const Intro = () => <section>
  <h2><em>@100ideas'</em> formik v2.0.3 playground</h2>
  <p>fork/edit this on stackblitz: <a href="https://stackblitz.com/edit/100ideas-formik-playground" >stackblitz.com/edit/100ideas-formik-playground</a></p>
  <ol>
    <li><code>./components/TutorialPlayground</code> <a href="#SignupFormPlay">played around with offical tutorial</a></li>

    <li><code>./components/FormikTutorialFinal.js</code><a href="#FormikTutorialFinal">Formik Tutorial Final Result</a></li>

    <li><code>./components/FastFieldDIY.js</code> <a href="#FastInputField">FastField fix - demo of FastInputField rendering isolation</a></li>

    <li><code>./components/DraftEditorFormik.js</code> <a href="#formik-draftjs">how to hook Draft.js into formik for use as a custom field</a></li>
  </ol>
  <hr />
</section>



function App() {
  return <>
    <Intro />
    <SignupFormPlay />
    <hr />
    <FinalSignupForm/>
    <hr />
    <FastFieldDIY/>
    <hr />
    <FormikWithDraft />
    <MoreResources />
  </>
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
