import React from "react";

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

  render() {
    return (
      <label className="btn image-uploader">
        Select photo
        <input type="file" accept="image/*" onChange={this.onChange} />
      </label>
    );
  }
}

export default ImageUploader;
