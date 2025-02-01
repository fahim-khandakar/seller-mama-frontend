// cookieStorage.js
import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const setToCookie = (key: string, value: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  setCookie(key, value, { secure: true, sameSite: "strict" });
};

export const getFromCookie = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return getCookie(key);
};

export const removeFromCookie = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  deleteCookie(key);
};
