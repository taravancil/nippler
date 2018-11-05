import React from "react";

const Button = props => (
  <button
    id={props.id}
    type="button"
    onClick={props.handler}
    disabled={props.disabled}
    className="btn"
  >
    {props.children}
  </button>
);

export default Button;
