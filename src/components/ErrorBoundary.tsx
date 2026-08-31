"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">WebGL Failed to Initialize</h2>
          <p className="text-gray-400">
            Please ensure hardware acceleration is enabled in your browser, or try visiting on a more powerful device.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
