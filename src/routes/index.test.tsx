import React from 'react';
import Router from '.';
import { render, screen } from '@testing-library/react';
const mockIsAuthenticated = jest.fn().mockReturnValue(true);
jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  useAuth0: () => ({
    isAuthenticated: mockIsAuthenticated()
  }),
}));

describe('test routes', () => {
  test("profile links to not be visible if user is not authenticated", () => {
    mockIsAuthenticated.mockReturnValueOnce(false)
    render(
      <Router />
    );
    const homeRoute = screen.queryAllByText('Doordrishtee');
    expect(homeRoute.length).toBe(2);
  });
  test("profile links to be visible if user is authenticated", () => {
    mockIsAuthenticated.mockReturnValue(true)
    render(
      <Router />
    );
    const userRoute = screen.queryAllByText('Profile');
    expect(userRoute.length).toBe(1);
  })
});