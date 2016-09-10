import Button from './Button'
import React from 'react'

const ImageUploader = React.createClass({
  onChange(e) {
    if (e.target.files[0]) {
      this.readFile(e.target.files[0])
    }
  },
  promptFileUpload () {
    console.log()
    let input = document.createElement('input')
    input.type = 'file'
    input.id = 'upload-image'
    input.accept = 'image/*'
    input.onchange = this.onChange
    input.click()
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
      <Button
        type='flat'
        handler={this.promptFileUpload}
        alt={this.props.text}>
        Edit a photo
      </Button>
    )
  }
})

export default ImageUploader
