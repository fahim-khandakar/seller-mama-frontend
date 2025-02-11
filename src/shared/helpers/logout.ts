import { authKey } from "../config/constants";
import { removeFromCookie } from "./localStorage";

export const logout = () => {
  removeFromCookie(authKey);

  window.location.href = "/";
};
