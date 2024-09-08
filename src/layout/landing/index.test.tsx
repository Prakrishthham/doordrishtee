import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Landing from './index';

describe('Landing Component', () => {
  it('renders landing page', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    // Add more assertions for other links if needed
  });
});