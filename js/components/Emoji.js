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
    const name = `emoji-char-${e.target.innerText}`
    const input = document.getElementsByName(name)[0]

    input.checked = true
    this.setState({ char: input.value })

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
    let modifiers = null

    // The emoji has modifiers
    if (this.props.options) {
      modifiers =
        <EmojiModifiers
          char={this.props.char}
          visible={this.state.pressed}
          selectModifier={this.selectModifier}
          hideModifiers={this.hideModifiers} />
    }

    return (
      <div className='emoji'>
        <div>
          <input
            id={'emoji-' + this.props.category}
            name={'emoji-char-' + this.state.char}
            type='radio'
            value={this.state.char} />
          <label
            onMouseDown={this.mouseDown}
            onMouseUp={this.mouseUp}
            htmlFor={'emoji-' + this.props.category}
            className='emoji__char'>
              {this.state.char}
          </label>
        </div>
        {modifiers}
      </div>
    )
  }
})

export default Emoji
