import EmojiKeyboard from "./EmojiKeyboard";
import NippleGallery from "./NippleGallery";
import Tabs from "./Tabs";

import React from "react";

const Controls = ({ disabled, handleNipple, updateNippleRadius }) => (
  <div className="controls">
    <Tabs
      tabs={["nipples", "emoji"]}
      content={[
        <NippleGallery handler={handleNipple} />,
        <EmojiKeyboard handler={handleNipple} />
      ]}
    />

    <div className="flex">
      <label htmlFor="nipple-size">size</label>
      <input
        name="nipple-size"
        type="range"
        min="5"
        max="100"
        step="1"
        defaultValue="15"
        disabled={disabled}
        onInput={updateNippleRadius}
      />
    </div>
  </div>
);

export default Controls;
