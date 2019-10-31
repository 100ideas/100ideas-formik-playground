import React from 'react';
import { FormikConsumer } from 'formik';


const objectIsEmpty = (obj) => Object.keys(obj).length === 0

const filterUsedProps = (props) => {
  return Object.keys(props).filter( k => {  
    let prop = props[k]
    return typeof prop === 'object'
      ? !objectIsEmpty(prop)        // true if object and not empty 
        ? true : false     
      : typeof prop === 'function'  // false if function; else true
        ? false : prop !== undefined
  }) 
}

const ActiveProp = ({prop, val, idx}) => 
  <div key={idx}> 
    <code>{prop}:</code><pre style={{display: "inline"}}> {JSON.stringify(val, null, 2)} </pre>
  </div>

const PropsboxHeader = ({name, fancy = false}) =>
  <div className="flexbar">
    {fancy 
      ? <h5 className="propsbox-title">injected Formik props <small>("non-empty")</small></h5>
      : <h5 className="propsbox-title">all props, JSON.stringified</h5>
    }
    <h6 className="srcfile">{name ? name : ''}</h6>
  </div>

export const Debug = ({displayName = false}) =>
<FormikConsumer>
  {(props) => (
    <div className="formik-debug">

      <div className="flexy propsbox-fancy">
        <PropsboxHeader name={displayName} fancy/>
        <div className="propsbox">
          {filterUsedProps(props).map( (prop, idx) => <ActiveProp idx={idx} prop={prop} val={props[prop]}/>)}
        </div>
      </div>  
    
      <div className="flexy propsbox-json">
        <PropsboxHeader name={displayName}/>
        <pre className="textbox" >
          <strong>props</strong> ={' '}
          {JSON.stringify(props, null, 2)}
        </pre>
      </div>
      
    </div>
  )}
</FormikConsumer>
