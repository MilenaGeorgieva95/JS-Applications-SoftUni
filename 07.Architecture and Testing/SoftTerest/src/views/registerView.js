import { registerUser } from "../api/auth.js";

const registerSec = document.querySelector("#register");
const registerForm = registerSec.querySelector("form");
registerForm.addEventListener("submit", onRegister);

let context = null;

export function showRegister(ctx) {
  context = ctx;
  context.render(registerSec);
  context.updateNav()
}

async function onRegister(e) {
  e.preventDefault();
  const formData = new FormData(registerForm);
  registerForm.reset();
  const email = formData.get("email");
  const password = formData.get("password");
  const repeatPassword = formData.get("repeatPassword");

  if (!email || !password || !repeatPassword) {
    alert("Missing fields!");
    return;
  }
  if (password !== repeatPassword) {
    alert("Passwords don't match!");
    return;
  }
  if (email.length < 3 || password.length < 3) {
    alert("Email or password too short!");
    return;
  }

  try {
    await registerUser(email, password, repeatPassword);
    registerForm.reset();
    context.updateNav();
    context.goTo("/");
  } catch (error) {
    console.log(error.message);
    return
  }
}
