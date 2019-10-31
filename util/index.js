import React from 'react';

export { MoreResources } from './MoreResources'

/* 
 * shuffleArray(arr: [<any>]): [<any>]
 * - returns a randomly shuffled copy of input array
 * 
 * pickRandomUpTo(upperBound: int): <int>
 * - returns an integer selected randomly between 0 and the input (non-inclusive) upper bound
*/ 
export function pickRandomUpTo(upperBound) {
  return Math.floor(Math.random() * Math.floor(upperBound));
}
export function shuffleArray(arr){
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

// helper for making src code links in flexbox section headers
// 
// <RepoLinkBar /> should be contained within a parent with classes such as `<div className="flexbar bm2">`
export const RepoLinkBar = ({srcName}) => 
  <div className="repo-links">
    <h5 className="src-link">
      <a href={`https://github.com/100ideas/100ideas-formik-playground/blob/master/components/${srcName}.js`}>browse src</a>
    </h5>
    <h5 className="src-link">
      <a href={`https://stackblitz.com/edit/100ideas-formik-playground?file=components/${srcName}.js`}>live edit</a>
    </h5>
  </div>