import React from "react";
import Emoji from "./Emoji.js";

class EmojiKeyboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chars: [],
      categories: []
    };
  }

  componentWillMount = () => {
    this.req = new XMLHttpRequest();

    this.req.onload = () => {
      let res = JSON.parse(this.req.response);

      this.setState({
        chars: res.chars,
        categories: res.categories
      });
    };

    this.req.open("GET", "/assets/emoji.json");
    this.req.send();
  };

  setSelected = char => {
    this.setState({ selected: char });
  };

  componentWillUnmount() {
    // Cancel pending XHR
    this.req.abort();
  }

  render() {
    return (
      <div className="emoji-keyboard">
        <div className="emoji-categories">
          {this.state.categories.map((category, i) => (
            <a
              key={i}
              href={"#emoji-" + category.title}
              className="emoji-category"
            >
              <svg viewBox="0 0 24 24">
                <title>{category.title}</title>
                <path d={category.icon} />
              </svg>
            </a>
          ))}
        </div>
        <div className="emoji-chars">
          {this.state.chars.map((emoji, i) => (
            <Emoji
              key={i}
              char={emoji.char}
              options={emoji.mods}
              category={emoji.cat}
              selected={emoji.char === this.state.selected ? true : false}
              handler={this.props.handler}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default EmojiKeyboard;
