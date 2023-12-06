import { loginUser } from "../api/auth.js";

const loginSec = document.querySelector("#login");
const loginForm = loginSec.querySelector("form");
loginForm.addEventListener("submit", onLogin);

let context = null;
export function showLogin(ctx) {
  context = ctx;
  context.render(loginSec);
  context.updateNav();
}

async function onLogin(e) {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    alert("Missing fields!");
    return;
  }

  try {
    await loginUser(email, password);
    loginForm.reset();
    context.updateNav();
    context.goTo("/");
  } catch (error) {
    console.log(error.message);
    return
  }
}
