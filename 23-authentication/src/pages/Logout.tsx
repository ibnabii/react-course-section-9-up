import { ActionFunction, redirect } from "react-router-dom";

export const action: ActionFunction = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
};
