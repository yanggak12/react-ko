import React, { Component } from "react";

export class Toc extends Component {
  render() {
    const list = [];
    const data = this.props.data;
    let i = 0;
    while (i < data.length) {
      list.push(
        <li>
          <a href={"/content/" + data[i].id}>{data[i].title}</a>
        </li>
      );
      i = i + 1;
    }
    return (
      <nav>
        <ul>{list}</ul>
      </nav>
    );
  }
}

export default Toc;
