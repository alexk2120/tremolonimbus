import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio(this.props.url),
      currentTime: 0,
      percentDone: 0,
      playing: false
    };

    this.playOrPause = this.playOrPause.bind(this);
    this.seekAudio = this.seekAudio.bind(this);
    this.changeSeekPosition = this.changeSeekPosition.bind(this);
  }

  componentDidMount() {
    this.timeInterval = setInterval(() => this.updateTime(), 1000);
    this.barInterval = setInterval(() => this.updateBar(), 10);
  }

  updateTime() {
    this.setState({
      currentTime: Math.floor(this.state.audio.currentTime)
    });
  }

  updateBar() {
    this.setState({
      percentDone: 100 * (this.state.audio.currentTime / this.state.audio.duration)
    });
  }

  playOrPause() {
    if (this.state.playing) {
      this.state.audio.pause();
    } else {
      this.state.audio.play();
    }
    this.setState({
      playing: !this.state.playing,
    });
  }

  changeSeekPosition(e) {
    const { x, width } = e.target.getBoundingClientRect();
    this.setState({
      seekPosition: (e.clientX  - x) / width
    });

    if (this.state.playing) {
      // Show the darker orange bar
    }
  }

  seekAudio() {
    const { audio, seekPosition } = this.state;
    audio.currentTime = seekPosition * audio.duration;
    this.updateTime();
    this.updateBar();
  }

  render() {
    return (
      <div className="page-player">
        <div className="track-info-and-button">
          <button
            className="play-pause-button"
            onClick={this.playOrPause}
          >
            {this.state.playing ? "Pause" : "▶"}
          </button>
          <div>
            <p className="artist-name">
              Artist
            </p>
            <p className="track-name">
              {this.props.title}
            </p>
          </div>
        </div>
        <div
          className="grey-bar"
          onClick={this.seekAudio}
          onMouseMove={this.changeSeekPosition}
        >
          <div
            className="orange-bar"
            style={{ width: `${this.state.percentDone}%` }}
          ></div>
        </div>
      </div>
    )
  }
}

export default Player;