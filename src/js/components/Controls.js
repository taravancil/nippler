import EmojiKeyboard from "./EmojiKeyboard";
import NippleGallery from "./NippleGallery";
import Tabs from "./Tabs";

import React from "react";

const Controls = ({
  disabled,
  handleEmoji,
  handleNipple,
  updateNippleRadius,
  nippleStyle
}) => (
  <div className="controls">
    <p>type</p>
    <Tabs
      tabs={["nipples", "emoji"]}
      content={[
        <NippleGallery handler={handleNipple} />,
        <EmojiKeyboard handler={handleEmoji} active={nippleStyle} />
      ]}
    />
    <p className="controls__size">
      <label htmlFor="nipple-size">size</label>
      <input
        name="nipple-size"
        type="range"
        min="5"
        max="50"
        defaultValue="15"
        disabled={disabled}
        onInput={updateNippleRadius}
      />
    </p>
  </div>
);

export default Controls;
