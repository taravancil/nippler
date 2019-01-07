import React from "react";

const Button = props => (
  <button
    id={props.id}
    type="button"
    onClick={props.handler}
    disabled={props.disabled}
    className={props.className + " btn"}
  >
    {props.children}
  </button>
);

export default Button;
