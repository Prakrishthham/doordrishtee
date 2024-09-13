import React from 'react';
import { render, screen } from '@testing-library/react';
import Preferences from '.';

test('renders learn react link', () => {
  render(<Preferences />);
  const linkElement = screen.getByText(/Preferences/i);
  expect(linkElement).toBeInTheDocument();
});
