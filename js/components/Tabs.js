import React from 'react'

const Tabs = React.createClass({
  getInitialState() {
    return {
      activeIndex: 0,
    }
  },
  shouldComponentUpdate(_, nextState) {
    return this.state.activeIndex != nextState.activeIndex
  },
  updateActive(e) {
    const i = e.target.dataset.index
    this.setState({ activeIndex: i })
  },
  render() {
    return (
      <div>
        <div>
          {this.props.tabs.map((tab, i) =>
            <button onClick={this.updateActive} key={i} data-index={i}>{tab}</button>
          )}
        </div>
        <div>
          {this.props.content.map((node, j) =>
            <div key={'tab-content-' + j}>
              {node}
            </div>
          )}
        </div>
      </div>
    )
  }
})

export default Tabs
