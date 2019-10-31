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

function pickRandomUpTo(upperBound) {
  return Math.floor(Math.random() * Math.floor(upperBound));
}

function shuffleArray(arr){
  let shuffled = []
  let safety = 0;
  while (shuffled.length < arr.length){
    let pick = pickRandomUpTo(arr.length)
    if(shuffled.indexOf(pick) === -1) shuffled.push(pick)
    if(++safety > 100 * arr.length) break
    continue
  }
  let shuffler = (acc, cur) => [ ...acc, arr[cur] ]
  if(safety > 10 * arr.length) console.warn('shuffleArray iterated > 10x input length!', safety)
  return shuffled.reduce(shuffler, [])
}

let hands = shuffleArray(['👇', '👇🏿', '👇🏼', '👇🏽', '👇🏾', '👇🏿'])

const Intro = () => <section>
  <h2><em>@100ideas'</em> formik v2.0.3 playground</h2>
  <p>fork/edit this on stackblitz: <a href="https://stackblitz.com/edit/100ideas-formik-playground" >stackblitz.com/edit/100ideas-formik-playground</a></p>
  <p>clone/fork on github: <a href="https://github.com/100ideas/100ideas-formik-playground">github.com/100ideas/100ideas-formik-playground</a></p>
  <h4>demos:</h4>
  <ol>
    <li><code>./components/TutorialPlayground</code> playing around with offical tutorial <a href="#SignupFormPlay">{hands[0]}</a></li>

    <li><code>./components/FormikTutorialFinal.js</code>official Formik Tutorial Final Result <a href="#FormikTutorialFinal">{hands[1]}</a></li>

    <li><code>./components/FastFieldDIY.js</code>FastField fix - demo of FastInputField rendering fields isolated from Form prop changes<a href="#FastInputField">{hands[2]}</a></li>

    <li><code>./components/DraftEditorFormik.js</code>how to hook Draft.js into formik for use as a custom field<a href="#formik-draftjs">{hands[3]}</a></li>
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
