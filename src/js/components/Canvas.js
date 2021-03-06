import React from "react";

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasSupported: false,
      dragging: false,
      dragIndex: -1
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.image !== null || nextProps.image !== null;
  }

  componentWillMount() {
    // Create blank canvas to check if the browser supports <canvas>
    const canvas = document.createElement("canvas");
    this.setState({ canvasSupported: !!canvas.getContext("2d") });
    this.nipples = this.constructNipples(this.props.nippleNumber);
  }

  componentDidMount() {
    if (this.state.canvasSupported) {
      this.canvas = document.getElementById("nippler-canvas");
      this.ctx = this.canvas.getContext("2d");
    }
  }

  componentWillReceiveProps(nextProps) {
    const canvasContainer = document.querySelector(".canvas-container");

    if (nextProps.nippleNumber !== this.props.nippleNumber) {
      this.nipples = this.constructNipples(nextProps.nippleNumber);
    }

    // Is this the first time a background has been set?
    const isFirstImage = this.props.image === null && nextProps.image !== null;

    // Is this update going to redraw the background image?
    const isNewImage = this.props.image !== nextProps.image;

    // Is this update changing the nipple radius?
    const isNewRadius = this.props.nippleRadius !== nextProps.nippleRadius;

    if (isFirstImage || isNewImage) {
      // resize the canvas to fit the image
      this.resize(
        [this.canvas],
        canvasContainer.clientWidth,
        canvasContainer.clientHeight
      );

      // We need to draw the image
      let image = nextProps.image;

      if (image.height > this.canvas.height) {
        const scaleY = this.getScale(this.canvas.height, image.height);
        this.resize([image], image.width * scaleY, image.height * scaleY);
      }

      // downsize the image if necessary
      if (image.width > this.canvas.width) {
        const scaleX = this.getScale(this.canvas.width, image.width);
        this.resize([image], image.width * scaleX, image.height * scaleX);
      }
      this.resize([this.canvas], image.width, image.height);

      this.setState({ image: image });
      this.ctx = this.canvas.getContext("2d");
    }

    // If it's the first time drawing the canvas or this update changes the
    // nipple radius, update state.maxX and state.maxY
    if (isNewRadius || isFirstImage) {
      const radius = nextProps.nippleRadius;

      const maxX = this.canvas.width - radius;
      const maxY = this.canvas.height - radius;

      this.setState({
        maxX: maxX,
        maxY: maxY
      });
    }
  }

  constructNipples(n) {
    const nipples = [];

    while (nipples.length < n) {
      const i = nipples.length;
      nipples.push({
        x: this.props.nippleRadius * 2 * i + this.props.nippleRadius,
        y: this.props.nippleRadius + 5,
        rad: this.props.nippleRadius
      });
    }
    return nipples;
  }

  resize(targets, width, height) {
    for (const target of targets) {
      target.width = width;
      target.height = height;
    }
  }

  getScale(target, source) {
    return target / source;
  }

  /* Whenever the component receives new props or the state is updated, the
   * canvas needs to be cleared and completely redrawn.
   */
  componentDidUpdate() {
    this.clear();
    this.drawBackground();
    this.drawNipples();
  }

  getCursorPosition = e => {
    const bounds = e.target.getBoundingClientRect();

    const adjustedWidth = this.canvas.width / bounds.width;
    const adjustedHeight = this.canvas.height / bounds.height;

    return {
      x: (e.clientX - bounds.left) * adjustedWidth,
      y: (e.clientY - bounds.top) * adjustedHeight
    };
  };

  isClicked = (el, x, y) => {
    const distX = x - el.x;
    const distY = y - el.y;
    return Math.pow(distX, 2) + Math.pow(distY, 2) < Math.pow(el.rad, 2);
  };

  onMouseDown = e => {
    // Set up layers
    let topLayer = -1;

    const cursor = this.getCursorPosition(e);

    // Is the cursor on a nipple?
    for (let i = 0; i < this.nipples.length; i += 1) {
      const nipple = this.nipples[i];
      let clicked = this.isClicked(nipple, cursor.x, cursor.y);

      // The nipple is only clicked if it's not underneath a different nipple
      if (clicked && i > topLayer) {
        topLayer = i;
        this.setState({
          dragHoldX: cursor.x - nipple.x,
          dragHoldY: cursor.y - nipple.y,
          dragIndex: topLayer,
          dragging: true
        });
        break;
      }
    }
    e.preventDefault();
  };

  onDrag = e => {
    let posX, posY;
    const cursor = this.getCursorPosition(e);

    // Set the drag bounds so that nipples aren't dragged outside of the canvas
    const minX = this.props.nippleRadius;
    const minY = this.props.nippleRadius;
    const maxX = this.state.maxX;
    const maxY = this.state.maxY;

    // Clamp posX and posY to prevent nipples from being dragged out of bounds
    posX = cursor.x - this.state.dragHoldX;
    posX = posX < minX ? minX : posX > maxX ? maxX : posX;
    posY = cursor.y - this.state.dragHoldY;
    posY = posY < minY ? minY : posY > maxY ? maxY : posY;

    // Update the dragged nipple's position on the canvas
    const currentNipple = this.nipples[this.state.dragIndex];

    currentNipple.x = posX;
    currentNipple.y = posY;

    // Force an update since a re-render is never triggered during onDrag
    this.forceUpdate();
  };

  stopDragging = () => {
    this.setState({ dragging: false });
  };

  // Draws this.props.image on the canvas
  drawBackground = () => {
    const image = this.state.image;
    this.ctx.drawImage(image, 0, 0, image.width, image.height);
  };

  drawNipples = () => {
    // nippleStyle can be the color 'peachpuff' or an image
    const style = this.props.nippleStyle;
    let drawFunc;

    // Determine which drawing function to use
    if (style === "peachpuff") {
      drawFunc = this.drawNipplePlain;
    } else {
      drawFunc = this.drawNippleImage;
    }

    // Draw the nipples in this.nipples
    for (let nipple of this.nipples) {
      drawFunc(nipple.x, nipple.y, this.props.nippleRadius);
    }
  };

  // Draws a circle on the canvas
  drawNipplePlain = (x, y, radius) => {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fillStyle = "peachpuff";
    this.ctx.fill();
  };

  // Draws a nipple image on the canvas
  drawNippleImage = (x, y, radius) => {
    const diameter = radius * 2;
    this.ctx.drawImage(
      this.props.nippleStyle,
      x - radius,
      y - radius,
      diameter,
      diameter
    );
  };

  // Clears the canvas
  clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  render() {
    if (!this.state.canvasSupported) {
      return <p>Sorry, your browser doesn’t support Nippler :(</p>;
    }

    let onMouseMove = this.state.dragging ? this.onDrag : null;

    return (
      <canvas
        id="nippler-canvas"
        onMouseDown={this.onMouseDown}
        onMouseUp={this.stopDragging}
        onMouseLeave={this.stopDragging}
        onMouseMove={onMouseMove}
      />
    );
  }
}

Canvas.defaultProps = {
  image: null,
  nippleStyle: "peachpuff",
  nippleRadius: 30
};

export default Canvas;
