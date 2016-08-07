import React from 'react'

const Button = (props) =>
  <button
    id={props.id}
    type='button'
    aria-label={props.alt}
    className={'btn btn--' + props.type}
    onClick={props.handler}
    disabled={props.disabled}>
      {props.children}
  </button>

export default Button
