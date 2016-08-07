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

  render() {
    return (
      <div>
        <div className='canvas-container'>
          <Canvas />
          <ImageUploader />
        </div>
      </div>
    )
  }
})

export default Editor
