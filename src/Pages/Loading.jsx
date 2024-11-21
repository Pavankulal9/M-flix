import React from "react";

const Loading = ({ type = "text" }) => {
  return (
    <div className="loading">
      {type === "spinner" ? <div></div> : <h1>Loading...</h1>}
    </div>
  );
};

export default Loading;
