import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonClick }) => {
  return (
    <div>
      <p className="f3">
        {"This magic brain will detect your brain, Give it a chance!"}
      </p>
      <div className="center">
        <div className="pa4 br3 shadow-5 form">
          <input
            className="w-70 f4"
            type="text"
            name="url"
            onChange={onInputChange}
            placeholder="Enter image url (Not more than 200 characters)"
          />
          <button
            className="w-30  grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonClick}
          >
            {" "}
            Detect{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
