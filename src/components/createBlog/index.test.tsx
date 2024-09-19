import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateBlog from '.';

test('renders learn react link', () => {
  render(<CreateBlog />);
  const linkElement = screen.getByText(/Create Blog/i);
  expect(linkElement).toBeInTheDocument();
});
