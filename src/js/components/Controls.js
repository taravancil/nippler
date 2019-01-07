import EmojiKeyboard from "./EmojiKeyboard";
import NippleGallery from "./NippleGallery";
import Tabs from "./Tabs";

import React from "react";

const Controls = ({ disabled, handleNipple }) => (
  <div className={disabled ? "hidden" : "" + "controls"}>
    <Tabs
      tabs={["nipples", "emoji"]}
      content={[
        <NippleGallery handler={handleNipple} />,
        <EmojiKeyboard handler={handleNipple} />
      ]}
    />
  </div>
);

export default Controls;
