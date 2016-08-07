import Canvas from './Canvas'
import ImageUploader from './ImageUploader'

import React from 'react'

const Editor = React.createClass({
  getInitialState() {
    return {
      nippleRadius: 15,
      nippleStyle: 'black',
      nippleNum: 2,
      image: null,
      imageSet: false,
    }
  },
  // Takes an Image `image` and updates the state
  imageHandler(image) {
    this.setState({
      image: image,
      imageSet: true
    })
  },
  // Creates a download link to the canvas as a data URL and clicks it
  downloadCanvas() {
    const src = document.getElementById('nippler-canvas').toDataURL()
    let a = document.createElement('a')
    a.href = src
    a.download = "nippler.jpg"
    a.click()
  },
  render() {
    return (
      <div>
        <div className='canvas-container'>
          <Canvas />
        </div>
        <button onClick={this.downloadCanvas} disabled={!this.state.imageSet}>
          Download photo
        </button>
        <ImageUploader imageHandler={this.imageHandler} />
      </div>
    )
  }
})

export default Editor
