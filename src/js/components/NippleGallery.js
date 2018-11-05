import React from "react";

const nipples = new Array(10);
nipples.fill(1);

const NippleGallery = ({ handler }) => (
  <div className="nipple-gallery flex">
    {nipples.map((nipple, i) => (
      <label key={i} htmlFor={"nipple-" + i} className="nipple">
        <input
          name="nipple-type"
          id={"nipple-" + i}
          type="radio"
          onClick={handler}
          value={"/assets/images/n" + (i + 1) + ".png"}
        />
        <img src={"/assets/images/n" + (i + 1) + ".png"} />
      </label>
    ))}
  </div>
);
export default NippleGallery;
