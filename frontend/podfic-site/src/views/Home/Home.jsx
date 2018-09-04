import React, { Component, Fragment } from "react";
import { Header } from "../../components/Header";
import { SinglePodfic } from "../../components/SinglePodfic";

class Home extends Component {
  componentDidMount() {
    this.props.fetchAllPodfics()
  }

  render() {
    const { podfics } = this.props;
    return (
      <Fragment>
        <Header />
        <div className="podfic-list">
          {podfics.map(podfic => (
            <SinglePodfic key={podfic.id} podfic={podfic} />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Home;
