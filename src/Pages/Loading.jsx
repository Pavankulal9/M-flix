import React from "react";

const Loading = ({ type = "text", customText }) => {
  return (
    <div className="loading">
      {type === "spinner" ? <div></div> : <h1>Loading...</h1>}
      {customText && <p>{customText}</p>}
    </div>
  );
};

export default Loading;
