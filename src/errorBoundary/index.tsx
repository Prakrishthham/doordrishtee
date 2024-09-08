import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  // Other props...
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
    </div>
  );
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;