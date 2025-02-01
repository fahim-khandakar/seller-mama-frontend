/* eslint-disable @typescript-eslint/no-explicit-any */
import { authKey } from "../config/constants";
import { decodedToken } from "./jwt";
import { getFromCookie, removeFromCookie, setToCookie } from "./localStorage";

export const getUserInfo = async () => {
  const authToken = await getFromCookie(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
    // return { role: "admin" };
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromCookie(authKey);
  return !!authToken;
};

export const removeUserInfo = () => {
  removeFromCookie(authKey);
};

export const setAuthToken = (token: string) => {
  setToCookie(authKey, token);
};

export const isUserAdmin = async () => {
  const authToken = await getFromCookie(authKey); // Wait for the promise to resolve
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return decodedData?.role === "admin";
  } else {
    return false;
  }
};
