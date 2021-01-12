import React, { useState } from 'react';

export default props => {
  const originalDescription = props.description;
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const handleSubmit = e => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append('track[title]', title);
    fileData.append('track[uploader_id]', props.currentUserId);
    if ((description !== "") || (!!originalDescription)) {
      fileData.append('track[description]', description);
    }
    props.updateTrack(fileData, props.id)
      .then(props.disappearAndCloseModal);
  }

  return (
    <div className="track-form-container">
      <form className="track-form">
        <div className="form-item">
          <label
            htmlFor="title-input"
            className="title-label"
          >
            Title <span className="required-asterisk">*</span>
          </label>
          <input
            id="title-input"
            type="text"
            value={title}
            placeholder="Name your track"
            onChange={e => setTitle(e.currentTarget.value)}
          />
        </div>
        <div className="form-item">
          <label
            htmlFor="description-input"
            className="description-label"
          >Description</label>
          <textarea
            id="description-input"
            type="text"
            value={description}
            placeholder="Describe your track"
            onChange={e => setDescription(e.currentTarget.value)}
          />
        </div>
        <div className="track-form-bottom">
          <p className="required-field-message">
            <span className="required-asterisk">*</span> Required fields
          </p>
          <div className="submit-buttons">
            <button
              type="button"
              onClick={props.cancelAction}
              className="cancel-button"
            >Cancel</button>
            <button
              type="button"
              onClick={handleSubmit}
              className="save-button"
            >Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  )
};