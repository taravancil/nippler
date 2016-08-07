import React from 'react'

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

  render() {
    return (
      <div>Editor</div>
    )
  }
})

export default Editor
