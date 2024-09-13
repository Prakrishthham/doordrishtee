import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from './index';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
 useNavigate: () => mockedUsedNavigate,
}));
const mockLoginOut = jest.fn();

jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  useAuth0: () => ({
    logout: mockLoginOut
  }),
}));

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Doordrishtee').length).toBeGreaterThan(0);
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
    it('Opens the sideMenu', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const aboutLink = screen.getAllByTestId('sideMenuNavigation');
      expect(aboutLink.length).toBe(1); 
      fireEvent.click(aboutLink[0]);
    });
    it('navigates to about page on click of Login Link', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const loginLink = screen.getAllByText('Login');
      expect(loginLink.length).toBeGreaterThan(1); // since both mobile and desktop views have different layout links
      fireEvent.click(loginLink[1]);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
    });
  });
  describe('test use nav links', () => {
    test('should open the user menu on click of user icon', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const userButton = screen.getAllByTestId('userButton');
      expect(userButton.length).toBe(1);
      fireEvent.click(userButton[0]);
      expect(screen.getAllByText('Profile').length).toBe(1);
    });
    test('should close the user menu on click of profile link', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const userButton = screen.getAllByTestId('userButton');
      fireEvent.click(userButton[0]);
      const profileLink = screen.getAllByText('Profile');
      expect(profileLink[0]).toBeVisible();
      fireEvent.click(profileLink[0]);
      const newProfileLink = screen.getAllByText('Profile');
      expect(newProfileLink[0]).not.toBeVisible();
    })
    test('User logout functionality', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const userButton = screen.getAllByTestId('userButton');
      fireEvent.click(userButton[0]);
      const profileLink = screen.getAllByText('Logout');
      expect(profileLink[0]).toBeVisible();
      fireEvent.click(profileLink[0]);
      expect(mockLoginOut).toHaveBeenCalled();
    });
  })
});