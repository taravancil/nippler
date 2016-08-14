import Emoji from './Emoji.js'

import React from 'react'

const EmojiKeyboard = React.createClass({
  getInitialState () {
    return {
      chars: [],
      categories: []
    }
  },
  componentDidMount () {
    this.req = new XMLHttpRequest()

    this.req.onload = () => {
      let res = JSON.parse(this.req.response)

      this.setState({
        chars: res.chars,
        categories: res.categories
      })
    }

    this.req.open('GET', '/assets/emoji.json')
    this.req.send()
  },
  componentWillUnmount () {
    // Cancel pending XHR
    this.req.abort()
  },
  render () {
    return (
      <div className='emoji-keyboard'>
        <div className='emoji-categories'>
          {this.state.categories.map((category, i) =>
            <a
              key={i}
              href={'#emoji-' + category.title}
              className='emoji-category'>
                <svg viewBox='0 0 24 24'>
                  <title>{category.title}</title>
                  <path d={category.icon}></path>
                </svg>
            </a>
          )}
        </div>
        <div className='emoji-chars'>
          {this.state.chars.map((emoji, i) =>
            <Emoji
              key={i}
              char={emoji.char}
              options={emoji.options}
              category={emoji.category}
              handler={this.props.handler} />
          )}
        </div>
      </div>
    )
  }
})

export default EmojiKeyboard
