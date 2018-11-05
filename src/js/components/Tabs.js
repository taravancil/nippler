import React from "react";

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };

    this.updateActive = this.updateActive.bind(this);
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
        <div className="tabs">
          {this.props.tabs.map((tab, i) => (
            <button
              onClick={this.updateActive}
              className={
                this.state.activeIndex == i ? "tab tab--active" : "tab"
              }
              key={i}
              data-index={i}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-contents">
          {this.props.content.map((node, j) => (
            <div
              className={
                this.state.activeIndex == j
                  ? "tab-content tab-content--active"
                  : "tab-content"
              }
              key={"tab-content-" + j}
            >
              {node}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Tabs;
