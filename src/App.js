import React from "react";

import Subject from "./Subject";
import Toc from "./Toc";
import Content from "./Content";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "welcome",
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
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div class="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
        />
        <Toc data={this.state.contents} />
        <Content title={_title} desc={_desc} />
      </div>
    );
  }
}
export default App;
