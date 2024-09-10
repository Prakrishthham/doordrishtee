import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from './index';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
 useNavigate: () => mockedUsedNavigate,
}));

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
  describe('tests header link navigation', () => {
    it('navigates to about page on click of About Link', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const aboutLink = screen.getAllByText('About');
      expect(aboutLink.length).toBeGreaterThan(1); // since both mobile and desktop views have different layout links
      fireEvent.click(aboutLink[0]);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/about');
    });
    it('navigates to about page on click of Login Link', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const loginLink = screen.getAllByText('Login');
      expect(loginLink.length).toBeGreaterThan(1); // since both mobile and desktop views have different layout links
      fireEvent.click(loginLink[0]);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
    });
  });
});