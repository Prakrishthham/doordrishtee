import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from ".";

const mockLoginWithRedirect = jest.fn();

jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  useAuth0: () => ({
    loginWithRedirect: mockLoginWithRedirect
  }),
}));

describe("test Login Page", () => {
  test("renders Login page", () => {
    render(<Login />);
    const linkElement = screen.getAllByText(/login/i).length;
    expect(linkElement).toBeGreaterThan(0);
  });
  test("click of login button okta fn should be called", () => {
    render(<Login />);
    const loginLink = screen.getAllByText(/Log in/i);
    fireEvent.click(loginLink[0]);
    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });
});
