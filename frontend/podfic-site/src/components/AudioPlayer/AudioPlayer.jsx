import React, { Component } from "react";
import moment from "moment";
import "./audioplayer.css";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded(event) {
    this.setState({ expanded: !this.state.expanded });
  }
  render() {
    const { url, seconds, description, hasMusic, type } = this.props.file;
    const { expanded } = this.state;
    const duration = moment.duration(seconds, "seconds");
    return (
      <div className="audio-player">
        <div className="audio-player--description">
          <button
            className="audio-player--expanded-icon"
            onClick={this.toggleExpanded}
          >
            {expanded ? "v" : ">"}
          </button>
          {description}
          <span className="audio-player--type"> ({type})</span>
          <span className="audio-player--length">
            {duration.hours()}h {duration.minutes()}m {duration.seconds()}s
          </span>
        </div>
        {expanded &&
          type === "mp3" && (
            <div className="audio-player--mp3-player">
              <audio controls src={url} type="audio/mpeg" />
            </div>
          )}
      </div>
    );
  }
}

export default AudioPlayer;
