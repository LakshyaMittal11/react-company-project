import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }
componentDidCatch(error) {
  console.error("Error caught by ErrorBoundary:", error);
}
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-box">
          <h1>Something went wrong!</h1>
          <p>Please refresh the page and try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;