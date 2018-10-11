import React from "react";

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.activeIndex !== nextState.activeIndex;
  }

  updateActive(e) {
    this.setState({ activeIndex: e.target.dataset.index });
  }

  render() {
    return (
      <div>
        <div>
          {this.props.tabs.map((tab, i) => (
            <button onClick={this.updateActive} key={i} data-index={i}>
              {tab}
            </button>
          ))}
        </div>

        <div>
          {this.props.content.map((node, j) => (
            <div className="tab__content" key={"tab-content-" + j}>
              {node}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Tabs;
