import { LoaderFunction, redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  if (!storedExpirationDate) {
    return -1;
  }
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  return expirationDate.getTime() - now.getTime();
}

export const tokenLoader: LoaderFunction = () => {
  return getAuthToken();
};

export const checkAuthLoader: LoaderFunction = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }

  return null;
};
