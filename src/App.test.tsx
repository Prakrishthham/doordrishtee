import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Doordrishtee/i).length;
  expect(linkElement).toBeGreaterThan(0);
});
