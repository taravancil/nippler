import React from "react";

const EmojiModifiers = props => (
  <div className="emoji__modifiers" onMouseLeave={props.hideModifiers}>
    {["🏻", "🏼", "🏽", "🏾", "🏿"].map((mod, j) => (
      <span
        key={j}
        className="emoji__char emoji__modifier"
        onMouseOver={props.selectModifier}
        onClick={props.hideModifiers}
      >
        {props.char + mod}
      </span>
    ))}
  </div>
);

export default EmojiModifiers;
