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
  render() {
    return (
      <div>
        <div className='canvas-container'>
          <Canvas />
        </div>
        <ImageUploader imageHandler={this.imageHandler} />
      </div>
    )
  }
})

export default Editor
