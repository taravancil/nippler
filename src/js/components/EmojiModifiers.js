const styles = {
  hidden: {
    zIndex: "-2"
  },
  visible: {
    zIndex: "2"
  }
};

const EmojiModifiers = props => (
  <div
    className="emoji__modifiers"
    style={props.visible ? styles.visible : styles.hidden}
    onMouseLeave={props.hideModifiers}
  >
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
