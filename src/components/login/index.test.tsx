import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '.';
import { MemoryRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>);
  const linkElement = screen.getAllByText(/login/i).length;
  expect(linkElement).toBeGreaterThan(0);
});
