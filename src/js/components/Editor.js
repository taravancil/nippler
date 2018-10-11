import React from "react";

import Canvas from "./Canvas";
import Controls from "./Controls";
import Button from "./Button";
import ImageUploader from "./ImageUploader";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nippleRadius: 15,
      nippleStyle: "blue",
      nippleNum: 2,
      image: null,
      imageSet: false
    };
  }

  // Takes an Image `image` and updates the state
  imageHandler(image) {
    this.setState({
      image: image,
      imageSet: true
    });
  }

  // Creates a download link to the canvas as a data URL and clicks it
  downloadCanvas() {
    const src = document.getElementById("nippler-canvas").toDataURL();
    let a = document.createElement("a");
    a.href = src;
    a.download = "nippler.jpg";
    document.body.appendChild(a);
    a.click();
  }

  updateNippleEmoji(char) {
    this.setState({ nippleStyle: char });
  }

  updateNippleImage(e) {
    let image = new Image();
    image.src = e.target.value;
    this.setState({ nippleStyle: image });
  }

  updateNippleRadius(e) {
    this.setState({ nippleRadius: e.target.value });
  }

  render() {
    let downloadBtn = null;
    if (this.state.imageSet) {
      downloadBtn = (
        <Button
          handler={this.downloadCanvas}
          style={!this.state.imageSet ? "" : { display: "none" }}
        >
          Download &darr;
        </Button>
      );
    }
    return (
      <div>
        <div className="canvas-container">
          {downloadBtn}
          <ImageUploader imageHandler={this.imageHandler} />
          <Canvas
            nippleRadius={this.state.nippleRadius}
            nippleStyle={this.state.nippleStyle}
            image={this.state.image}
          />
        </div>
        <Controls
          downloadCanvas={this.downloadCanvas}
          handleImage={this.imageHandler}
          handleEmoji={this.updateNippleEmoji}
          handleNipple={this.updateNippleImage}
          updateNippleRadius={this.updateNippleRadius}
          disabled={!this.state.imageSet}
          nippleStyle={this.state.nippleStyle}
        />
      </div>
    );
  }
}

export default Editor;
