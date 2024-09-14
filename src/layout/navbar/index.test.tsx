import React, { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "./index";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const mockLoginOut = jest.fn();
const mockloginWithRedirect = jest.fn();
let mockIsAuthenticated = false;
jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  useAuth0: () => ({
    logout: mockLoginOut,
    loginWithRedirect: mockloginWithRedirect,
    user: {
      picture: "hello",
    },
    isAuthenticated: mockIsAuthenticated,
  }),
}));

describe("Navbar Component", () => {
  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getAllByText("Doordrishtee").length).toBeGreaterThan(0);
  });
  describe("tests header link navigation", () => {
    it("navigates to about page on click of About Link", () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const aboutLink = screen.getAllByText("About");
      expect(aboutLink.length).toBeGreaterThan(1); // since both mobile and desktop views have different layout links
      expect(aboutLink[0]).toBeVisible();
      fireEvent.click(aboutLink[0]);
    });
    it("Opens the sideMenu", () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const navigationLink = screen.getAllByTestId("sideMenuNavigation");
      expect(navigationLink.length).toBe(1);
      fireEvent.click(navigationLink[0]);
      const aboutLink = screen.getAllByText("About");
      expect(aboutLink.length).toBeGreaterThan(1); // since both mobile and desktop views have different layout links
      expect(aboutLink[1]).toBeVisible();
      fireEvent.click(aboutLink[1]);
    });
    it("Closes the sideMenu", async () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const aboutLink0 = screen.getAllByText("About");
      expect(aboutLink0.length).toBeGreaterThan(1); // since both mobile and desktop views have different layout links
      expect(aboutLink0[1]).not.toBeVisible();
      const navigationLink = screen.getAllByTestId("sideMenuNavigation");
      expect(navigationLink.length).toBe(1);
      fireEvent.click(navigationLink[0]);
      const aboutLink = screen.getAllByText("About");
      expect(aboutLink.length).toBeGreaterThan(1); // since both mobile and desktop views have different layout links
      expect(aboutLink[1]).toBeVisible();
      const doordrishtee = screen.getAllByText("Doordrishtee");
      expect(doordrishtee.length).toBeGreaterThan(1);
      fireEvent.click(navigationLink[0]);
      fireEvent.click(doordrishtee[0]);

      const sideMenu = screen.getAllByTestId("sideMenu");
      fireEvent.click(sideMenu[0]);
      act(() => {
        expect(sideMenu[0].getAttribute("aria-hidden")).toBe(true);
      });
    });
  });
  describe("test use nav links", () => {
    test("should open the user menu on click of user icon", () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const userButton = screen.getAllByTestId("userButton");
      expect(userButton.length).toBe(1);
      fireEvent.click(userButton[0]);
      expect(screen.getAllByText("Login").length).toBe(1);
    });
    test("should called okta method loginWithRedirect on click of login button", () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const userButton = screen.getAllByTestId("userButton");
      expect(userButton.length).toBe(1);
      fireEvent.click(userButton[0]);
      const loginButton = screen.getAllByText("Login");
      expect(loginButton.length).toBe(1);
      fireEvent.click(loginButton[0]);
      expect(mockloginWithRedirect).toHaveBeenCalledTimes(1);
    });
    test("should close the user menu on click of profile link", () => {
      mockIsAuthenticated = true;
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const userButton = screen.getAllByTestId("userButton");
      fireEvent.click(userButton[0]);
      const profileLink = screen.getAllByText("Profile");
      expect(profileLink[0]).toBeVisible();
      fireEvent.click(profileLink[0]);
      const newProfileLink = screen.getAllByText("Profile");
      expect(newProfileLink[0]).not.toBeVisible();
      mockIsAuthenticated = false;
    });
    test("User logout functionality", () => {
      mockIsAuthenticated = true;
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
      const userButton = screen.getAllByTestId("userButton");
      fireEvent.click(userButton[0]);
      const profileLink = screen.getAllByText("Logout");
      expect(profileLink[0]).toBeVisible();
      fireEvent.click(profileLink[0]);
      expect(mockLoginOut).toHaveBeenCalled();
      mockIsAuthenticated = false;
    });
  });
});
