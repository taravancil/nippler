import Canvas from './Canvas'
import Controls from './Controls'
import Button from './Button'
import ImageUploader from './ImageUploader'

import React from 'react'

const styles = {
  display: 'flex',
  width: '98%',
  maxWidth: '1000px',
  margin: 'auto',
}

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
  updateNippleEmoji (char) {
    this.setState({ nippleStyle: char })
  },
  updateNippleImage (e) {
    let image = new Image()
    image.src = e.target.value
    this.setState({ nippleStyle: image })
  },
  updateNippleRadius (e) {
    this.setState({ nippleRadius: e.target.value })
  },
  render() {
    let downloadBtn = null
    console.log(this.state.imageSet)
    if (this.state.imageSet) {
      downloadBtn = <Button handler={this.downloadCanvas}
        style={!this.state.imageSet ? '' : {display: 'none'}}>
        Download &darr;
      </Button>
    }
    return (
      <div style={styles}>
        <div className='canvas-container' style={{textAlign: 'right'}}>
          {downloadBtn}
          <ImageUploader imageHandler={this.imageHandler} />
          <Canvas
            nippleRadius={this.state.nippleRadius}
            nippleStyle={this.state.nippleStyle}
            image={this.state.image} />
        </div>
        <Controls
          downloadCanvas={this.downloadCanvas}
          handleImage={this.imageHandler}
          handleEmoji={this.updateNippleEmoji}
          handleNipple={this.updateNippleImage}
          updateNippleRadius={this.updateNippleRadius}
          disabled={!this.state.imageSet} />
      </div>
    )
  }
})

export default Editor
