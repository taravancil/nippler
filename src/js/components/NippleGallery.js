import React from "react";

const nipples = new Array(10);
nipples.fill(1);

const NippleGallery = ({ handler, currentNippleIdx }) => (
  <div className="nipple-gallery grid">
    {nipples.map((nipple, i) => (
      <label key={i} htmlFor={"nipple-" + i} className="nipple">
        <input
          name="nipple-type"
          id={"nipple-" + i}
          type="radio"
          onChange={handler}
          checked={i === currentNippleIdx}
          value={"/assets/images/n" + (i + 1) + ".png"}
        />
        <img
          width="55"
          height="55"
          src={"/assets/images/n" + (i + 1) + ".png"}
        />
      </label>
    ))}
  </div>
);
export default NippleGallery;
