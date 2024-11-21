import React from "react";

const Error = ({ error = null }) => {
  return (
    <div className="error">
      {error === null ? (
        <p>
          Something went wrong!.Please check your internet connection and try
          again!
        </p>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default Error;
