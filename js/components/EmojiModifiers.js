import React from 'react'

const EmojiModifiers = (props) =>
  <div style={{zIndex: props.zIndex}} onMouseLeave={props.hideModifiers}>
    {['🏻', '🏼', '🏽', '🏾', '🏿'].map((mod, j) =>
      <span
        key={j}
        onMouseOver={props.selectModifier}
        onClick={props.hideModifiers}>
          {props.char + mod}
      </span>
    )}
  </div>

export default EmojiModifiers
