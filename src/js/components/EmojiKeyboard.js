import React from "react";

class EmojiKeyboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      q: "",
      emoji: [],
      searchResults: [],
      selected: null,
      skinTone: "1"
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.lazyLoad = this.lazyLoad.bind(this);
    this.loadEmoji = this.loadEmoji.bind(this);
    this.changeSkinTone = this.changeSkinTone.bind(this);
  }

  componentWillMount() {
    this.loadEmoji();
    this.lazyLoad();
  }

  loadEmoji() {
    this.req = new XMLHttpRequest();

    this.req.onload = () => {
      const emoji = JSON.parse(this.req.response);
      this.setState({ emoji, searchResults: emoji[this.state.skinTone] });
    };

    this.req.open("GET", `/assets/emoji-1.json`);
    this.req.send();
  }

  componentDidMount() {
    document
      .querySelector(".emoji-chars")
      .addEventListener("scroll", this.lazyLoad);
  }

  componentWillUnmount() {
    // Cancel pending XHR
    this.req.abort();

    document
      .querySelector(".emoji-chars")
      .removeEventListener("scroll", this.lazyLoad);
  }

  changeSkinTone(e) {
    this.setState({
      skinTone: e.target.value,
      searchResults: this.state.emoji[e.target.value],
      q: ""
    });
  }

  lazyLoad() {
    const els = document.querySelectorAll("[data-src]");

    // only check 50 at a time
    const limit = els.length > 50 ? 50 : els.length;
    for (let i = 0; i < limit; i++) {
      const el = els[i];
      if (this.isInViewport(el)) {
        el.src = el.getAttribute("data-src");
        el.removeAttribute("data-src");
      }
    }
  }

  handleSearch(e) {
    clearTimeout(this.searchTimeout);

    const q = e.target.value;

    this.searchTimeout = setTimeout(() => {
      let searchResults = [];
      let currentEmoji = this.state.emoji[this.state.skinTone];
      if (!q.length) {
        searchResults = currentEmoji;
      }

      if (this.state.q.length && q.startsWith(this.state.q)) {
        searchResults = this.state.searchResults.filter(e => e.includes(q));
      } else {
        searchResults = currentEmoji.filter(e =>
          e.split("skin-tone")[0].includes(q)
        );
      }
      this.setState({ searchResults, q });
    }, 350);
  }

  isInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
      rect.right >= 0 &&
      rect.left <=
        (window.innerWidth + 250 || document.documentElement.clientWidth + 250)
    );
  }

  render() {
    var skinTones = ["1", "2", "3", "4", "5", "6"];

    let emojiEl;
    if (this.state.renderingEmoji) {
      emojiEl = "Loading...";
    } else {
      emojiEl = (
        <div className="emoji-chars">
          {this.state.searchResults.map((emoji, i) => (
            <label key={i} htmlFor={"emoji-" + i} className="emoji-container">
              <input
                className="emoji-input"
                name="emoji"
                id={"emoji-" + i}
                type="radio"
                value={"/assets/images/emoji/" + emoji + ".png"}
                onClick={this.props.handler}
              />
              <img
                className="emoji-char"
                width="35"
                height="35"
                src={"/assets/images/emoji/" + emoji + ".png"}
              />
            </label>
          ))}
        </div>
      );
    }

    return (
      <div>
        <div className="emoji-controls flex">
          <input
            className="emoji-search"
            type="text"
            onKeyUp={this.handleSearch}
            placeholder="Search"
          />

          <fieldset className="inline-flex">
            <legend>skin tone</legend>
            {skinTones.map(tone => (
              <div
                key={tone}
                className="custom-toggle-input-container skin-tone-input-container"
              >
                <input
                  className="custom-toggle-input skin-tone-input"
                  aria-label={"skin tone " + tone}
                  name="skintone"
                  type="radio"
                  id={"skintone-" + tone}
                  value={tone}
                  onChange={this.changeSkinTone}
                  checked={this.state.skinTone === tone}
                />
                <div
                  data-key={tone}
                  className="custom-toggle-input-decorator skin-tone-input-decorator"
                  aria-hidden="true"
                />
              </div>
            ))}
          </fieldset>
        </div>

        {emojiEl}
      </div>
    );
  }
}

export default EmojiKeyboard;
