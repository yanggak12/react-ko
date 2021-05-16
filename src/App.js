import React from "react";

import Subject from "./Subject";
import Toc from "./Toc";
import Content from "./Content";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "read",
      selected_content_id: 2,
      subject: {
        title: "WEB",
        sub: "World Wide Web!",
      },
      welcome: { title: "Welcome", desc: "Hello, React !!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is HyperText Markup Language" },
        { id: 2, title: "CSS", desc: "CSS is Crete Style Sheet" },
        {
          id: 3,
          title: "JavaScript",
          desc: "JavaScript is ECMA Script for interactive",
        },
      ],
    };
  }
  render() {
    let _title,
      _desc = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === "read") {
      let i = 0;
      while (i < this.state.contents.length) {
        let data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        />
        <Toc
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({ mode: "read", selected_content_id: Number(id) });
          }.bind(this)}
        />
        <Content title={_title} desc={_desc} />
      </div>
    );
  }
}
export default App;
