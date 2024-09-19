import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Landing from './index';

const mockIsAuthenticated = jest.fn().mockReturnValue(true);
jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  useAuth0: () => ({
    isAuthenticated: mockIsAuthenticated()
  }),
}));
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Landing Component', () => {
  it('renders landing page', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
  });
  it('should not display `Add Blog` button for unauthenticated user', () => {
    mockIsAuthenticated.mockReturnValueOnce(false)
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    const addButton = screen.queryAllByRole('button');
    expect(addButton.length).toBe(0);
  });
  it('should display `Add Blog` button for authenticated user', () => {
    mockIsAuthenticated.mockReturnValueOnce(true)
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    const addButton = screen.queryAllByRole('button');
    expect(addButton.length).toBe(1);
  });
  it('should navigate to create blog page on click of `Add Blog` button', () => {
    mockIsAuthenticated.mockReturnValueOnce(true)
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    const addButton = screen.queryAllByRole('button');
    expect(addButton.length).toBe(1);
    fireEvent.click(addButton[0]);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});