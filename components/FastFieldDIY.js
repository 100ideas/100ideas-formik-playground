/*
* the current example of FastField in formik v2.0.3 
* (https://github.com/jaredpalmer/formik/blob/master/examples/FastField.js)
* is not isolating Form field states for independant renders - the whole form
* rerenders.
*
* `FastInputField` was contributed by @ersel in formik issue#1739 as a short-term
* workaround.
*
* download formik repo, add this file to `examples/`, update
* `.storybook/example.stories.js` (use existing FastField story as template),
* then run storybook.
*/


import React from 'react';
import { Formik, FastField, Form, connect, getIn } from 'formik';
import { Debug } from './Debug'

class Input extends React.Component {
  renders = 0;
  render() {
    return (
      <div className="fif-base">
        <input {...this.props} />
        <p>
          # of renders: <code>{this.renders++}</code> 
          a random #: <span>{Math.trunc(Math.random() * 100000)/100 }</span>
        </p>
      </div>
    );
  }
}

// https://github.com/jaredpalmer/formik/issues/1739#issuecomment-521175764
class FastInputField extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { name, formik } = this.props;
    if (nextProps.name !== name) {
      return true;
    }
    const nextValue = getIn(nextProps.formik.values, name);
    const previousValue = getIn(formik.values, name);
    if (nextValue !== previousValue) {
      return true;
    }
    return false;
  }

  render() {
    const { name, formik, row, validateForm } = this.props;
    const value = getIn(formik.values, name);

    return (
      <Input
        value={value}
        type="text"
        onChange={e => {
          formik.setFieldValue(name, e.target.value);
        }}
      />
    );
  }
}

const Fif = connect(FastInputField)


const initVals = {
  firstName: '',
  lastName: '',
  email: '',
}
const _onSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    setSubmitting(false);

    alert(JSON.stringify(values, null, 2));
  }, 500);
}

    

export const FastFieldDIY = () => (
  <div>
    <h4 id="FastInputField"><code>{"<FastFieldDIY>:"}</code>FastField fix - demo of FastInputField rendering isolation</h4>
    <blockquote>
      <p>
        <code><a href="https://github.com/jaredpalmer/formik/blob/master/examples/FastField.js">{"<FastField>"}</a></code> is supposed to isolate its rerendering from the containing form and only rerender when its subset of props change, however this isn't working in formik v2.0.3 (<a href="https://github.com/jaredpalmer/formik/issues/1739">issue #1739</a>).
      </p>
      <p>
        In the mean time <a href="https://github.com/ersel">@ersel</a> demonstrated <code><a href="https://github.com/jaredpalmer/formik/issues/1739#issuecomment-521175764">{"<FastInputField>"}</a></code>, a short component demonstrating how to recover this feature using <code>shouldComponentUpdate</code> & <code>formik.connect</code> <small>(src here is in <code><a href="https://stackblitz.com/edit/100ideas-formik-playground?file=components%2FFastFieldDIY.js">components/FormikTutorialFinal.js</a></code>)</small>
      </p>
    </blockquote>

    <h4>Sign Up</h4>
    <Formik
      initialValues={initVals}
      onSubmit={_onSubmit}
    > 
      { ({isSubmitting}, ...props) => <Form>
          <label htmlFor="firstName">First Name</label>
          <Fif
            name="firstName"
            placeholder="Jane"
            as={Input}
            disabled={isSubmitting}
          />

          <label htmlFor="lastName">Last Name</label>
          <Fif
            name="lastName"
            placeholder="Doe"
            // as={Input}
            disabled={isSubmitting}
            props
          />

          <label htmlFor="email">Email</label>
          <Fif
            name="email"
            placeholder="jane@acme.com"
            type="email"
            // as={Input}
            disabled={isSubmitting}
          />

          <button type="submit">Submit</button>
          <Debug displayName="<FastFieldDIY>"/>
        </Form>
      }
    </Formik>
  </div>
);


// original example from storybook (formik v2.0.3)
//
// const Basic = () => (
//   <div>
//     <h1>Sign Up</h1>
//     <Formik
//       initialValues={{
//         firstName: '',
//         lastName: '',
//         email: '',
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           setSubmitting(false);

//           alert(JSON.stringify(values, null, 2));
//         }, 500);
//       }}
//       render={({ isSubmitting }) => (
//         <Form>
//           <label htmlFor="firstName">First Name</label>
//           <FastField
//             name="firstName"
//             placeholder="Jane"
//             as={Input}
//             disabled={isSubmitting}
//           />

//           <label htmlFor="lastName">Last Name</label>
//           <FastField
//             name="lastName"
//             placeholder="Doe"
//             // as={Input}
//             disabled={isSubmitting}
//           />

//           <label htmlFor="email">Email</label>
//           <FastField
//             name="email"
//             placeholder="jane@acme.com"
//             type="email"
//             // as={Input}
//             disabled={isSubmitting}
//           />

//           <button type="submit">Submit</button>
//           <Debug />
//         </Form>
//       )}
//     />
//   </div>
// );

// export default Basic;
