import { get, post } from "./api.js";

const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
};

export async function registerUser(email, password, rePass) {
  const userData = await post(endpoints.register, { email, password, rePass });
  localStorage.setItem("accessToken", userData.accessToken);
  localStorage.setItem("userId", userData._id);
  localStorage.setItem("email", userData.email);
}
export async function loginUser(email, password) {
  const userData = await post(endpoints.login, { email, password });
  localStorage.setItem("accessToken", userData.accessToken);
  localStorage.setItem("userId", userData._id);
  localStorage.setItem("email", userData.email);
  return;
}
export async function logoutUser() {
  await get(endpoints.logout);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
}
