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
  /* Whenever the component receives new props or the state is updated, the
   * canvas needs to be cleared and completely redrawn.
   */
  componentDidUpdate() {
    this.clear()
    this.drawBackground()
    this.drawNipples()
  },
  getCursorPosition(e) {
    const offset = e.target.offset()

    return {
      x: e.clientX - offset.left,
      y: e.clientY - offset.top
    }
  },
  isClicked(el, x, y) {
    const distX = x - el.x
    const distY = y - el.y
    return (Math.pow(distX, 2) + Math.pow(distY, 2) < Math.pow(el.rad, 2))
  },
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
  },
  // Draws this.props.image on the canvas
  drawBackground() {
    const image = this.props.image
    this.ctx.drawImage(image, 0, 0, image.width, image.height)
  },
  drawNipples() {
    // nippleStyle can be the color 'black', an image, or an emoji character
    const style = this.props.nippleStyle
    let drawFunc

    // Determine which drawing function to use
    if (style === 'black') {
      drawFunc = this.drawNipplePlain
    }
    else if (typeof style === 'string') {
      drawFunc = this.drawNippleEmoji
    }
    else {
      drawFunc = this.drawNippleImage
    }

    // Draw the nipples in this.nipples
    for (let nipple of this.nipples) {
      drawFunc(nipple.x, nipple.y, this.props.nippleRadius)
    }
  },
  // Draws a circle on the canvas
  drawNipplePlain(x, y, radius) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, Math.PI*2, false)
    this.ctx.closePath()
    this.ctx.fillStyle = 'black'
    this.ctx.fill()
  },
  // Draws an emoji on the canvas
  drawNippleEmoji(x, y, radius) {
    // Adjust font size
    // TODO this may need to be adjusted
    this.ctx.font = `${radius*2.1}px Arial`
    this.ctx.fillText(this.props.nippleStyle, x + radius, y + radius)
  },
  // Draws a nipple image on the canvas
  drawNippleImage(x, y, radius) {
    const d = radius * 2
    this.ctx.drawImage(this.props.nippleStyle, x - radius, y - radius, d, d)
  },
  // Clears the canvas
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
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
