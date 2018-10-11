const styles = {
  base: {
    width: "100%",
    minWidth: "300px",
    maxWidth: "358px",
    background: "#f7f7f7"
  },
  tabsContentContainer: {
    position: "relative",
    height: "177px"
  },
  tabContent: {
    position: "absolute",
    top: "0"
  },
  tabs: {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    background: "#f7f7f7",
    borderBottom: "1px solid #dedede"
  },
  tab: {
    cursor: "pointer",
    outline: "none",
    border: "none",
    color: "blue",
    textTransform: "uppercase",
    borderBottom: "1px solid #dedede",
    marginBottom: "-1px",
    padding: "0 1em",
    background: "none"
  },
  active: {
    borderBottom: "3px solid blue"
  },
  visible: {
    zIndex: "2"
  },
  hidden: {
    zIndex: "-2"
  }
};

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.activeIndex !== nextState.activeIndex;
  }

  updateActive = e => {
    this.setState({ activeIndex: e.target.dataset.index });
  };

  render() {
    return (
      <div style={styles.base}>
        <div style={styles.tabs}>
          {this.props.tabs.map((tab, i) => (
            <button
              style={Object.assign(
                {},
                styles.tab,
                i == this.state.activeIndex ? styles.active : {}
              )}
              onClick={this.updateActive}
              key={i}
              data-index={i}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={styles.tabsContentContainer}>
          {this.props.content.map((node, j) => (
            <div
              className="tab__content"
              style={
                j == this.state.activeIndex ? styles.visible : styles.hidden
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
