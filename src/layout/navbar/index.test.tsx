import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navbar from './index';

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Doordrishtee').length).toBeGreaterThan(0);
    // Add more assertions for other links if needed
  });
});