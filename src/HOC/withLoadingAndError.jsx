import React from "react";
import Loading from "../Pages/Loading";
import Error from "../Pages/Error";

const withLoadingAndError = (WrapperComponent) => {
  return ({ isLoading, isError, errorMessage = null, ...props }) => {
    if (isLoading) {
      return <Loading />;
    } else if (isError) {
      return <Error error={errorMessage} />;
    }
    return <WrapperComponent {...props} />;
  };
};

export default withLoadingAndError;
