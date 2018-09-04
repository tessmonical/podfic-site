import React, { Component, Fragment } from "react";
import { Header } from "../../components/Header";
import { SinglePodfic } from "../../components/SinglePodfic";

class Home extends Component {
  componentDidMount() {
    this.props.fetchThisPodfic();
  }

  render() {
    const { podfic } = this.props;
    return (
      <Fragment>
        <Header />
        <SinglePodfic expanded podfic={podfic} />
      </Fragment>
    );
  }
}

export default Home;
