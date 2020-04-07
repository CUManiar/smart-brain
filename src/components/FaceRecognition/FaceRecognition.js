import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  console.log(boxes);
  return (
    <div className="center ma mb5">
      <div className="absolute ma2">
        {imageUrl.length > 0 ? (
          <img
            id="inputImage"
            src={imageUrl}
            height="auto"
            width="500px"
            alt="info"
          />
        ) : (
            "Please enter an URL! (Max char 200)"
          )}

        {boxes.map((box, i) => {
          return <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }} ></div>
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
