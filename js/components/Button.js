import React from 'react'

baseStyles = {
  border-radius: '2px',
  outline: 'none',
  border: 'none',
  background: 'none',
  height: '40px',
  padding: '0 1em',
  margin: '.5em',
  fontSize: '.8em'
}

const Button = (props) =>
  <button
    id={props.id}
    type='button'
    aria-label={props.alt}
    style={baseStyles}
    className={'btn btn--' + props.type}
    onClick={props.handler}
    disabled={props.disabled}>
      {props.children}
  </button>

export default Button
