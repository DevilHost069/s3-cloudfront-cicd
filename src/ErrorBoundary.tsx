/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React from "react";

import oopsImage from "./assets/oops.webp";

/* A component that catches errors in the children components. */
class ErrorBoundary extends React.Component<any> {
  state = {
    errorMessage: "",
  };

  static getDerivedStateFromError(error: any) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: any, info: any) {
    console.info(error.toString(), info.componentStack);
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <div className="errorBoundaryContainer">
          <img src={oopsImage} alt="error" />
          {import.meta.env.MODE !== "production" && (
            <p>{this.state.errorMessage}</p>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
