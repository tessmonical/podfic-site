import React, { Component, Fragment } from "react";
import { Header } from "../../components/Header";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div>Main content</div>
      </Fragment>
    );
  }
}

export default Home;
