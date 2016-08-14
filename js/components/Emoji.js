import EmojiModifiers from './EmojiModifiers.js'

import React, { PropTypes }  from 'react'

const Emoji = React.createClass({
  getInitialState() {
    return {
      char: this.props.char,
      pressed: false,
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.char != nextState.char || this.state.pressed != nextState.pressed
  },
  componentDidUpdate() {
    this.props.handler(this.state.char)
  },
  mouseDown(e) {
    e.target.checked = true
    this.setState({ char: e.target.value })
    this.pressed = window.setTimeout(this.showModifiers, 200)
  },
  mouseUp(e) {
    window.clearTimeout(this.pressed);
    this.setState({ pressed: false })
  },
  showModifiers() {
    this.setState({ pressed: true })
  },
  hideModifiers() {
    this.setState({ pressed: false })
  },
  selectModifier(e) {
    this.setState({ char: e.target.innerText })
  },
  render() {
    let zIndex = this.state.pressed ? 2 : -2
    let modifiers = this.props.options ? <EmojiModifiers char={this.props.char} hideModifiers={this.hideModifiers} zIndex={zIndex} selectModifier={this.selectModifier} /> : null

    return (
      <div className='emoji'>
        <div>
          <input
            id={'emoji-' + this.props.category}
            name='emoji-char'
            onMouseDown={this.mouseDown}
            onMouseUp={this.mouseUp}
            type='radio'
            value={this.state.char} />
          <label htmlFor={'emoji-' + this.props.category}>
            {this.state.char}
          </label>
        </div>
        {modifiers}
      </div>
    )
  }
})

export default Emoji
