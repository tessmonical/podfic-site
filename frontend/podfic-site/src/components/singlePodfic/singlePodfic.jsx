import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./singlepodfic.css";

class SinglePodfic extends Component {
  render() {
    const { podfic, expanded } = this.props;
    if (!podfic) return null;
    const {
      id,
      title,
      reader,
      writer,
      imageUrl,
      createdDate,
      updatedDate,
      tags
    } = podfic;
    return (
      <div className="single-podfic">
        <Link to={`/podfic/${id}`}>
          <span className="podfic-title">{title}</span>
        </Link>
        <div className="reader-writer">
          Written by {writer || "unknown"}, read by {reader || "unknown"}
        </div>
        <div className="posted-updated">
          Posted on {moment(createdDate).format("YYYY-MM-DD")}, updated on{" "}
          {moment(updatedDate).format("YYYY-MM-DD")}
        </div>
        <div className="tags">
          {tags &&
            tags.map(tag => {
              return <Link key={tag.id} to={`tags/${tag.id}`} />;
            })}
        </div>
        {expanded && (
          <div className="audio-files-list">
            LIST OF AUDIO FILES
          </div>
        )}
      </div>
    );
  }
}

export default SinglePodfic;
