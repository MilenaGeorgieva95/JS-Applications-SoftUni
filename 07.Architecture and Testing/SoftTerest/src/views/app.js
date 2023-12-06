document.querySelector("#viewsController").remove();
const main = document.querySelector("main");
const nav = document.querySelector("nav");
nav.addEventListener("click", onNavigate);

import { showHome } from "./homeView.js";
import { showDash } from "./dashboardView.js";
import { showLogin } from "./loginView.js";
import { showRegister } from "./registerView.js";
import { showCreate } from "./createView.js";
import { showDetails } from "./deatailsView.js";
import { logoutUser } from "../api/auth.js";

const routes = {
  "/": showHome,
  "/dashboard": showDash,
  "/login": showLogin,
  "/register": showRegister,
  "/create": showCreate,
  "/details": showDetails,
  "/logout": async () => {
    await logoutUser();
    updateNav();
    showHome(context);
  },
};

const context = {
  goTo,
  render,
  updateNav,
};

updateNav();
goTo("/");

function onNavigate(e) {
  e.preventDefault();
  let target = e.target;
  if (target.tagName !== "A" && target.tagName !== "IMG") {
    return;
  }
  if (target.tagName === "IMG") {
    target = target.parentElement;
  }
  const viewName = new URL(target.href).pathname;
  const view = routes[viewName];
  if (typeof view === "function") {
    view(context);
  }
}

function render(section) {
  main.replaceChildren(section);
}

function goTo(targetView, params) {
  const view = routes[targetView];
  if (typeof view === "function") {
    view(context,params);
  }
}

function updateNav() {
  const user = localStorage.getItem("accessToken");
  const userA = nav.querySelectorAll(".user");
  const guestA = nav.querySelectorAll(".guest");
  if (user) {
    userA.forEach((a) => (a.style.display = "inline-block"));
    guestA.forEach((a) => (a.style.display = "none"));
  } else {
    userA.forEach((a) => (a.style.display = "none"));
    guestA.forEach((a) => (a.style.display = "inline-block"));
  }
}
