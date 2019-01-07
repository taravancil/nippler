import React from "react";

import Canvas from "./Canvas";
import Controls from "./Controls";
import Button from "./Button";
import ImageUploader from "./ImageUploader";
import EmojiKeyboard from "./EmojiKeyboard";
import NippleGallery from "./NippleGallery";
import Tabs from "./Tabs";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nippleRadius: 30,
      nippleStyle: "peachpuff",
      nippleNumber: 2,
      currentNippleIdx: 1,
      image: null,
      imageSet: false
    };
  }

  // Takes an Image `image` and updates the state
  imageHandler = image => {
    this.setState({
      image: image,
      imageSet: true
    });
  };

  // Creates a download link to the canvas as a data URL and clicks it
  downloadCanvas = () => {
    const src = document.getElementById("nippler-canvas").toDataURL();
    let a = document.createElement("a");
    a.href = src;
    a.download = "nippler.jpg";
    document.body.appendChild(a);
    a.click();
  };

  updateNippleImage = e => {
    const currentNippleIdx = e.target.id.split("nipple-")[1];
    let image = new Image();
    image.src = e.target.value;
    this.setState({ nippleStyle: image, currentNippleIdx });
  };

  updateNippleRadius = e => {
    this.setState({ nippleRadius: e.target.value });
  };

  render() {
    let downloadBtn = null;
    let controls = null;

    return (
      <div>
        <div className="canvas-container">
          <div className="controls-controls flex">
            <div>
              <div
                className={
                  this.state.imageSet ? "size-controls inline-flex" : "hidden"
                }
              >
                <label htmlFor="nipple-size">size</label>
                <input
                  name="nipple-size"
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  defaultValue="15"
                  onInput={this.updateNippleRadius}
                />
              </div>
            </div>

            <div className="image-controls inline-flex">
              <Button
                className={this.state.imageSet ? "" : "hidden"}
                handler={this.downloadCanvas}
              >
                Download &darr;
              </Button>

              <ImageUploader imageHandler={this.imageHandler} />
            </div>
          </div>

          <Canvas
            nippleRadius={this.state.nippleRadius}
            nippleStyle={this.state.nippleStyle}
            nippleNumber={this.state.nippleNumber}
            image={this.state.image}
          />
        </div>

        <div className="container">
          <div className={this.state.imageSet ? "" : "hidden " + "controls"}>
            <Tabs
              tabs={["nipples", "emoji"]}
              content={[
                <NippleGallery
                  currentNippleIdx={this.state.currentNippleIdx}
                  handler={this.updateNippleImage}
                />,
                <EmojiKeyboard handler={this.updateNippleImage} />
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
