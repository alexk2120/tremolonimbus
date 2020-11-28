import React from 'react';
import { Redirect } from 'react-router-dom';

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      file: null
    }

    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.forgetFile = this.forgetFile.bind(this);
  }

  handleFile(e) {
    this.setState({
      file: e.currentTarget.files[0]
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append('track[title]', this.state.title);
    fileData.append('track[uploader_id]', this.props.currentUserId);
    fileData.append('track[audio]', this.state.file);
    if (this.state.description !== "") {
      fileData.append('track[description]', this.state.description);
    }
    const result = this.props.createTrack(fileData);
    result.then(({ track }) => {
      this.props.history.push(`/tracks/${track.id}`);
    })
  }

  handleChange(type) {
    return e => {
      this.setState({
        [type]: e.currentTarget.value
      })
    }
  }

  forgetFile() {
    this.setState({
      file: null
    });
  }

  render() {
    const { file } = this.state;
    const uploadControls = (
      <div className="upload-controls">
        <p className="upload-message">
          Upload your track here
        </p>
        <div className="upload-button">
          <label
            className="input-label"
            htmlFor="upload"
          >choose the file to upload</label>
          <input
            id="upload"
            type="file"
            className="hidden-input"
            onChange={this.handleFile}
          />
        </div>
      </div>
    );
    const uploadForm = (
      <form className="upload-form">
        <p>File: {file === null ? "Nothing selected" : file.name}</p>
        <label
          htmlFor="title-input"
          className="title-label"
        >Title
        </label>
        <input
          id="title-input"
          type="text"
          onChange={this.handleChange("title")}
        />
        <label
          htmlFor="description-input"
          className="description-label"
        >Description</label>
        <textarea
          id="description-input"
          type="text"
          onChange={this.handleChange("description")}
        />
        <div className="submit-buttons">
          <button
            onClick={this.forgetFile}
            className="cancel-button"
          >Cancel</button>
          <button
            onClick={this.handleSubmit}
            className="save-button"
          >Save</button>
        </div>
      </form>
    );
    return (
      <div className="upload-page">
        <div className="upload-box">
          {this.state.file === null ? uploadControls : uploadForm}
        </div>
      </div>
    )
  }
}

export default Upload;