import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AudioPlayer } from "../AudioPlayer";
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
      tags,
      files
    } = podfic;
    return (
      <Fragment>
        <div className="single-podfic">
          <div className={expanded ? "podfic-image expanded" : "podfic-image"}>
            {imageUrl && <img src={imageUrl} />}
          </div>
          <div className="podfic-info-box">
            <div className="podfic-title">
              <Link to={`/podfic/${id}`}>
                <span className="podfic-title-span">{title}</span>
              </Link>
            </div>
            <div className="reader-writer">
              Written by {writer || "unknown"}, read by {reader || "unknown"}
            </div>
            <div className="posted-updated">
              Posted on {moment(createdDate).format("YYYY-MM-DD")}, updated on{" "}
              {moment(updatedDate).format("YYYY-MM-DD")}
            </div>
            <div className="tags">
              <span>Tags: </span>
              {tags &&
                tags.map(tag => {
                  return (
                    <Link key={tag.id} to={`tag/${tag.id}`}>
                      {tag.name}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
        {expanded && (
          <div className="audio-files-list">
            {files.map(file => (
              <AudioPlayer key={file.id} file={file} />
            ))}
          </div>
        )}
      </Fragment>
    );
  }
}

export default SinglePodfic;
