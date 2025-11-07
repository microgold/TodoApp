import React from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div
      style={{
        padding: "2rem",
        background: "#f8d7da",
        color: "#721c24",
        borderRadius: "8px",
      }}
    >
      <h2>Something went wrong 😢</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        style={{
          background: "#721c24",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  );
}
