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
      dragging: false,
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
  getCursorPosition(e) {
    const offset = e.target.offset()

    return {
      x: e.clientX - offset.left,
      y: e.clientY - offset.top
    }
  }
  onDrag(e) {
    let posX, posY
    const cursor = this.getCursorPosition(e)

    // Set the drag bounds so that nipples aren't dragged outside of the canvas
    const minX = this.props.nippleRadius
    const minY = this.props.nippleRadius
    const maxX = this.state.maxX
    const maxY = this.state.maxY

    // Clamp posX and posY to prevent nipples from being dragged out of bounds
    posX = cursor.x - this.state.dragHoldX
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX)
    posY = cursor.y - this.state.dragHoldY
    posX = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY)

    // TODO: Update the nipple's position on the canvas
  }
  render() {
    if (!this.state.canvasSupported) { return <p>Update your browser.</p> }

    let onMouseMove = this.state.dragging ? this.onDrag : null

    return (
      <canvas
        id='nippler-canvas'
        onMouseMove={onMouseMove}>
      </canvas>
    )
  }
})

export default Canvas
