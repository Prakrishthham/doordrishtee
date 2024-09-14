import React from 'react';
import { render, screen } from '@testing-library/react';
import User from '.';

test('renders learn react link', () => {
  render(<User />);
  const linkElement = screen.getByText(/User/i);
  expect(linkElement).toBeInTheDocument();
});
