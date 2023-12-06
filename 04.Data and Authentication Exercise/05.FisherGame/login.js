const userDiv = document.querySelector("#user");
userDiv.style.display = "none";
const guestDiv = document.querySelector("#guest");
const loginForm = document.querySelector("#login-view #login");
const pNotification = document.querySelector(".notification");
const pEmail = document.querySelector(".email");
const aLogout = document.querySelector("a#logout");

if (sessionStorage.accessToken != null) {
  guestDiv.style.display = "none";
  userDiv.style.display = "inline";
  pEmail.firstElementChild.textContent = sessionStorage.getItem("email");
}

loginForm.addEventListener("submit", onLogin);
aLogout.addEventListener("click", onLogout);

async function onLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  if ([...formData.entries()].some((x) => x[1] === "")) {
    pNotification.textContent = "Input field is empty";
    return;
  }
  pNotification.textContent = "";
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok != true) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    sessionStorage.setItem("accessToken", data.accessToken);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("id", data._id);
    window.location = "./index.html";
  } catch (error) {
    alert(error.message);
  }
}

async function onLogout() {
  const response = await logoutUser(sessionStorage.getItem("accessToken"));

  sessionStorage.clear();
  window.location = "./index.html";
}
