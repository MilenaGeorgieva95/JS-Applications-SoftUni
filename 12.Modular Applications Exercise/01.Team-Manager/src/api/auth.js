import { clearUserData, setUserData } from "../views/utils.js";
import { get, post } from "./api.js";

const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
};

export async function registerUser(email, username, password, repass) {
  const userData = await post(endpoints.register, { email, username, password, repass });
  setUserData(userData);
  return userData
}
export async function loginUser(email, password) {
  const userData = await post(endpoints.login, { email, password });
  setUserData(userData);
  return userData
}
export async function logoutUser() {
  const userData = get(endpoints.logout);
  clearUserData();

}
