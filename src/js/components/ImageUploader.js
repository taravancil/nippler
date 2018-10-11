import React from "react";
import Button from "./Button";

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = e => {
    if (e.target.files[0]) {
      const img = new Image();

      img.onload = () => {
        this.props.imageHandler(img);
      };

      img.src = window.URL.createObjectURL(e.target.files[0]);
    }
  };

  // Appends an <input type="file" accept="image/*"/> to the DOM and clicks it.
  promptFileUpload = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.id = "upload-image";
    input.accept = "image/*";
    input.onchange = this.onChange;
    input.click();
  };

  render() {
    return (
      <Button type="flat" handler={this.promptFileUpload} alt={this.props.text}>
        Edit a photo
      </Button>
    );
  }
}

export default ImageUploader;
