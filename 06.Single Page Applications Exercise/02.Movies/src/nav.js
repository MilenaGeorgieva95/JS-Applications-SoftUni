import { hideAll } from "./hideAllSec.js";
import { showHomeView } from "./home.js";

const userRef = document.querySelectorAll('li[class="nav-item user"]');
const guestRef = document.querySelectorAll('li[class="nav-item guest"]');
const welcomeRef = document.querySelector("#welcome-msg");
const logoutBtn = userRef[1].querySelector("a");
const loginBtn = guestRef[0].querySelector("a");
const registerBtn = guestRef[1].querySelector("a");

const loginSec = document.querySelector("#form-login");
const registerSec = document.querySelector("#form-sign-up");

export function navView() {
  loginSec.style.display = "none";
  registerSec.style.display = "none";
  logoutBtn.addEventListener("click", onLogout);
  loginBtn.addEventListener("click", onLogin);
  registerBtn.addEventListener("click", onRegister);

  guestUserNav();
}

//Register User-->
function onRegister(e) {
  e.preventDefault();
  hideAll();
  registerSec.style.display = "block";
  const registerForm = registerSec.querySelector("#register-form");
  registerForm.addEventListener("submit", registerUser);
}

async function registerUser(e) {
  e.preventDefault();
  registerSec.style.display = "block";
  loginSec.style.display = "none";
  const formData = new FormData(e.target);
  e.target.reset();
  const email = formData.get("email");
  const password = formData.get("password");
  const repeatPassword = formData.get("repeatPassword");

  if (!email || password.length < 6 || password !== repeatPassword) {
    alert("Unable to register!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3030/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, repeatPassword }),
    });

    if (response.status !== 200) {
      throw new Error("Unable to register: " + response.status);
    }

    const data = await response.json();
    localStorage.setItem("email", data.email);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("id", data._id);
    guestUserNav();
    showHomeView();
  } catch (error) {
    alert(error.message);
  }
}

//Logout User-->
async function onLogout(e) {
  e.preventDefault();
  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("id");

  try {
    const response = await fetch("http://localhost:3030/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify({ email, id }),
    });

    if (response.ok == false) {
      throw new Error("Unble to logout " + response.status);
    }

    localStorage.clear();
    guestUserNav();
    hideAll();
    loginSec.style.display = "block";
  } catch (error) {
    alert(error.message);
    return;
  }
}

//Login User-->
function onLogin(e) {
  e.preventDefault();
  hideAll();
  loginSec.style.display = "block";

  const loginForm = loginSec.querySelector("#login-form");
  loginForm.addEventListener("submit", loginUser);
}

async function loginUser(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  e.target.reset();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || password.length < 6) {
    return alert("Missing credentials!");
  }

  try {
    const response = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      throw new Error("Unable to login: " + response.status);
    }

    const data = await response.json();
    localStorage.setItem("email", data.email);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("id", data._id);

    guestUserNav();

    showHomeView();
  } catch (error) {
    alert(error.message);
    return;
  }
}

function guestUserNav() {
  if (localStorage.getItem("accessToken") !== null) {
    userRef[0].style.display = "block";
    userRef[1].style.display = "block";
    guestRef[0].style.display = "none";
    guestRef[1].style.display = "none";
    welcomeRef.style.display = "block";
    welcomeRef.textContent = "Welcome, " + localStorage.getItem("email");
  } else {
    userRef[0].style.display = "none";
    userRef[1].style.display = "none";
    guestRef[0].style.display = "block";
    guestRef[1].style.display = "block";
    welcomeRef.style.display = "none";
  }
}
