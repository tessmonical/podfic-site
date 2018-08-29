import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./singlepodfic.css";

class SinglePodfic extends Component {
  render() {
    const { podfic } = this.props;
    const {
      id,
      title,
      reader,
      writer,
      imageUrl,
      createdDate,
      updatedDate
    } = podfic;
    return (
      <div className="single-podfic">
        <Link to={`/podfics/${id}`}>
          <span className="podfic-title">{title}</span>
        </Link>
        <div className="reader-writer">
          Written by {writer || "unknown"},  read by {reader || "unknown"}
        </div>
        <div className="posted-updated">
          Posted on {moment(createdDate).format("YYYY-MM-DD")}, updated on{" "}
          {moment(updatedDate).format("YYYY-MM-DD")}
        </div>
      </div>
    );
  }
}

export default SinglePodfic;
