import EmojiModifiers from './EmojiModifiers.js'

import { h, Component } from 'preact'
class Emoji extends Component {
  constructor (props) {
    super(props)

    this.state = {
      char: this.props.char,
      pressed: false
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state.char !== nextState.char ||
      this.state.pressed !== nextState.pressed
  }

  componentDidUpdate () {
    this.props.handler(this.state.char)
  }

  mouseDown = (e) => {
    const id = `emoji-char-${e.target.innerText}`
    const el = document.getElementById(id)

    this.setState({ char: el.innerText })
    this.props.handler(this.state.char)

    // Only show modifiers if character pressed > 200ms
    this.pressed = window.setTimeout(this.showModifiers, 200)
  }

  mouseUp = (e) => {
    window.clearTimeout(this.pressed)
    this.setState({ pressed: false })
  }

  showModifiers = () => {
    this.setState({ pressed: true })
  }

  hideModifiers = () => {
    this.setState({ pressed: false })
  }

  selectModifier = (e) => {
    this.setState({ char: e.target.innerText })
  }

  render () {
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
        <div
          id={`emoji-char-${this.state.char}`}
          className={this.props.active ? 'emoji__char--active' : 'emoji__char'}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}>
          {this.state.char}
        </div>
        {modifiers}
      </div>
    )
  }
}

export default Emoji
