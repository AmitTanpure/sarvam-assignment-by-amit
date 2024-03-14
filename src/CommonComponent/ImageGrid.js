import React from "react";

const ImageWithText = ({ imageUrl, text, handleCardClick }) => {
  return (
    <div
      className="imageWithText"
      onClick={handleCardClick}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="overlay">
        <p className="overlay-text">{text}</p>
      </div>
    </div>
  );
};

export default ImageWithText;
