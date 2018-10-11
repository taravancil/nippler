import React from "react";

const nipples = [
  "/assets/images/n1.png",
  "/assets/images/n2.png",
  "/assets/images/n3.png",
  "/assets/images/n4.png",
  "/assets/images/n5.png",
  "/assets/images/n6.png",
  "/assets/images/n7.png",
  "/assets/images/n8.png",
  "/assets/images/n9.png",
  "/assets/images/n10.png"
];

const NippleGallery = ({ handler }) => (
  <div className="gallery">
    {nipples.map((nipple, i) => (
      <div key={i}>
        <input
          name="nipple-type"
          id={"nipple-" + i}
          type="radio"
          onClick={handler}
          value={nipple}
        />
        <label key={i} htmlFor={"nipple-" + i} className="gallery__nipple">
          <img src={nipple} width="50" height="50" />
        </label>
      </div>
    ))}
  </div>
);
export default NippleGallery;
