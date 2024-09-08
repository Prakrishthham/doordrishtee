import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '.';

// A component that intentionally throws an error
const ThrowError = () => {
  throw new Error('Test');
};

describe('ErrorBoundary', () => {
  // Temporarily suppress console errors to avoid cluttering test output
  const realError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = realError;
  });

  it('renders children when everything is fine', () => {
    render(
      <ErrorBoundary>
        <p>Everything is fine</p>
      </ErrorBoundary>
    );

    expect(screen.getByText(/Everything is fine/i)).toBeInTheDocument();
  });

  it('shows an apologetic error message when an unhandled exception is thrown', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
        <p>Everything is fine</p>
      </ErrorBoundary>
    );

    expect(screen.queryByText(/Everything is fine/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Something went wrong:/i)).toBeInTheDocument();
  });
});
