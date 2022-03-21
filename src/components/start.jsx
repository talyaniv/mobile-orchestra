import React from 'react'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({show, callback}) =>
  <button
    className='start-button'
    style={{ display: show ? 'block' : 'none' }}
      onClick={ callback }>
      Click to start <br /> לחצו להתחלה
  </button>