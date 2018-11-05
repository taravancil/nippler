import React from "react";

class EmojiKeyboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emoji: [],
      q: "",
      searchResults: [],
      searchTimeout: null,
      scrollTimeout: null,
      selected: null
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.lazyLoad = this.lazyLoad.bind(this);
  }

  componentWillMount() {
    this.req = new XMLHttpRequest();

    this.req.onload = () => {
      const emoji = JSON.parse(this.req.response);
      this.setState({
        emoji,
        searchResults: emoji
      });
    };

    this.req.open("GET", "/assets/emoji.json");
    this.req.send();

    this.lazyLoad();
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

    const searchTimeout = setTimeout(() => {
      let searchResults = [];
      if (!q.length) {
        searchResults = emoji;
      }

      if (this.state.q.length && q.startsWith(this.state.q)) {
        searchResults = this.state.searchResults.filter(e => e.includes(q));
      } else {
        searchResults = this.state.emoji.filter(e =>
          e.split("skin-tone")[0].includes(q)
        );
      }
      this.setState({ searchResults, q });
    }, 350);

    this.setState({ searchTimeout });
  }

  isInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
      rect.right >= 0 &&
      rect.left <=
        (window.innerWidth + 150 || document.documentElement.clientWidth + 150)
    );
  }

  render() {
    return (
      <div>
        <input
          className="emoji-search"
          type="text"
          onKeyUp={this.handleSearch}
          placeholder="Search"
        />
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
                src={
                  i < 50
                    ? "/assets/images/emoji/" + emoji + ".png"
                    : "https://proxy.duckduckgo.com/iur/?f=1&image_host=http%3A%2F%2Fbarbaracartategui.files.wordpress.com%2F2010%2F11%2Fpizza-pepperoni.jpg&u=https://barbaracartategui.files.wordpress.com/2010/11/pizza-pepperoni.jpg"
                }
                data-src={"/assets/images/emoji/" + emoji + ".png"}
              />
            </label>
          ))}
        </div>
      </div>
    );
  }
}

export default EmojiKeyboard;
