import React from 'react'

const Canvas = React.createClass({
  getDefaultProps() {
    return {
      image: null
    }
  },
  getInitialState() {
    return {
      canvasSupported: false,
    }
  },
  componentWillMount() {
    // Create blank canvas to check if the browser supports <canvas>
    const canvas = document.createElement('canvas')
    this.setState({ canvasSupported: !!canvas.getContext('2d') })
  },
  componentDidMount() {
    if (this.state.canvasSupported) {
      this.canvas = document.getElementById('nippler-canvas')
      this.ctx = this.canvas.getContext('2d')
    }
  },
  render() {
    if (!this.state.canvasSupported) { return <p>Update your browser.</p> }

    return (
      <canvas id='nippler-canvas'>
      </canvas>
    )
  }
})

export default Canvas
