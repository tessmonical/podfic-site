import React, { Component } from "react";
import { Link } from "react-router-dom";

class singlePodfic extends Component {
  render() {
    const { podfic } = this.props;
    const {podId, title, reader, writer, imageUrl} = podfic;
    return (
      <div className="single-podfic">
        <Link to={`/podfics/${podId}`}>{title}</Link>
      </div>
    );
  }
}

export default singlePodfic;
