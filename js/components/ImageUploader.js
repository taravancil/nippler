import React from 'react'

const ImageUploader = React.createClass({
  onChange(e) {
    if (e.target.files[0]) {
      this.readFile(e.target.files[0])
    }
  },
  readFile(file) {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result
      // Do something with the image
      this.props.imageHandler(img)
    }
  },
  render() {
    return (
      <input
        type='file'
        id='edit-image'
        accept='image/*'
        onChange={this.onChange} />
    )
  }
})

export default ImageUploader
