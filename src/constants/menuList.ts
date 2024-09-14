import { AppHeaderNavListInterface } from "../interfaces";

export const AppHeaderNavigationList: Array<AppHeaderNavListInterface> = [
  {
    name: "About",
    relPath: "/about",
  },
];

export const UserMenuList: Array<AppHeaderNavListInterface> = [
  {
    name: "Profile",
    relPath: "/user",
  },
  {
    name: "Preferences",
    relPath: "/preferences",
  },
  {
    name: "Logout",
    relPath: "/logout",
  },
];
