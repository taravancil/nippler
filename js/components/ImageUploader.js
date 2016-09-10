import Button from './Button'
import React from 'react'

const ImageUploader = React.createClass({
  onChange (e) {
    if (e.target.files[0]) {
      this.readFile(e.target.files[0])
    }
  },
  // Appends an <input type="file" accept="image/*"/> to the DOM and clicks it.
  promptFileUpload () {
    let input = document.createElement('input')
    input.type = 'file'
    input.id = 'upload-image'
    input.accept = 'image/*'
    input.onchange = this.onChange
    input.click()
  },
  // Reads the file and creates a new Image
  readFile (file) {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result
      this.props.imageHandler(img)
    }
  },
  render () {
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
