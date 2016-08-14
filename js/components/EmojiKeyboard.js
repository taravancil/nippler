import Emoji from './Emoji.js'

import React from 'react'

const styles = {
  base: {
    width: '350'
  },
  categories: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '.4em .3em .1em .3em'
  },
  category: {
    width: '25px',
    fill: 'blue'
  },
  chars: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: 'column wrap',
    overflowX: 'auto',
    background: 'white',
    height: '135',
    padding: '.4em 0'
  }
}

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
      <div style={styles.base}>
        <div style={styles.categories}>
          {this.state.categories.map((category, i) =>
            <a
              href={'#emoji-' + category.title}
              key={i}
              style={styles.category}>
                <svg viewBox='0 0 24 24'>
                  <title>{category.title}</title>
                  <path d={category.icon}></path>
                </svg>
            </a>
          )}
        </div>
        <div style={styles.chars}>
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
