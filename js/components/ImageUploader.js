import Button from './Button'
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
      <Button type='flat' alt={this.props.text}>
        <label htmlFor='upload-image'>
          <span>Edit a photo</span>
          <input
            style={{display: 'none'}}
            type='file'
            id='upload-image'
            accept='image/*'
            onChange={this.onChange} />
        </label>
      </Button>
    )
  }
})

export default ImageUploader
