import React from "react";
import Loading from "../Pages/Loading";
import Error from "../Pages/Error";

const withLoadingAndError = (WrapperComponent) => {
  return ({
    isLoading,
    isError,
    errorMessage = null,
    customText,
    ...props
  }) => {
    if (isLoading) {
      return <Loading customText={customText} />;
    } else if (isError) {
      return <Error error={errorMessage} />;
    }
    return <WrapperComponent {...props} />;
  };
};

export default withLoadingAndError;
