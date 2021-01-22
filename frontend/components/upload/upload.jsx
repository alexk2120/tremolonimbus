import React, { useState } from 'react';
import TrackCreateForm from './track_create_form';

export default props => {
  const [file, setFile] = useState(null);

  document.title = "Upload your music & audio and share it with the world. on TremoloNimbus";

  const dropFile = e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type.split("/")[0] === "audio") {
      setFile(file);
    } else {
      alert("Incorrect file type. Only audio files can be uploaded as tracks.")
    }
  }

  const cancelAction = () => {
    if (confirm("Are you sure you want to stop your upload? Any unsaved changes will be lost.")) {
      setFile(null);
    }
  }

  const uploadControls = (
    <div className="upload-box" >
      <div className="upload-controls">
        <p className="upload-message">
          Drag and drop your track here
        </p>
        <div className="upload-button">
          <label
            className="input-label"
            htmlFor="upload"
          >or choose the file to upload</label>
          <input
            id="upload"
            type="file"
            accept="audio/*"
            className="hidden-input"
            onChange={e => setFile(e.currentTarget.files[0])}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="upload-page"
      onDragOver={e => e.preventDefault()}
      onDrop={dropFile}
    >
      {file === null ? uploadControls :
        <div className="upload-track-form-container">
          <TrackCreateForm
            {...props}
            currentUserId={props.currentUserId}
            createTrack={props.createTrack}
            file={file} title={""} description={""}
            cancelAction={cancelAction}
          />
        </div>
      }
    </div>
  )
}