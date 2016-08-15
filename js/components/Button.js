import React from 'react'

const styles = {
  base: {
    outline: 'none',
    color: 'blue',
    border: '1px solid blue',
    boxShadow: '3px 3px 0px blue',
    background: '#fff',
    height: '40px',
    padding: '0 1em',
    margin: '.5em',
    fontSize: '.8em',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}

const Button = (props) =>
  <button
    id={props.id}
    type='button'
    aria-label={props.alt}
    style={styles.base}
    className={'btn btn--' + props.type}
    onClick={props.handler}
    disabled={props.disabled}>
      {props.children}
  </button>

export default Button
