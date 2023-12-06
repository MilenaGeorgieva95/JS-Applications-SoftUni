const userDiv = document.querySelector("#user");
userDiv.style.display = "none";
const pEmail = document.querySelector(".email");
const guestDiv = document.querySelector("#guest");
const registerForm = document.querySelector("form#register");
const pNotification = document.querySelector(".notification");
const aLogout = document.querySelector("a#logout");
registerForm.addEventListener("submit", onRegister);
aLogout.addEventListener("click", onLogout);

if (sessionStorage.accessToken != null) {
  guestDiv.style.display = "none";
  userDiv.style.display = "inline";
  pEmail.firstElementChild.textContent = sessionStorage.getItem("email");
}

async function onRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  if ([...formData.entries()].some((x) => x[1] === "")) {
    pNotification.textContent = "input field is empty";
    return;
  }
  if (formData.get("password") !== formData.get("rePass")) {
    pNotification.textContent = "Incorrect Password";
    return;
  }
  pNotification.textContent = "";

  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const response = await fetch("http://localhost:3030/users/register", {
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
    pEmail.firstElementChild.textContent = data.email;
    event.target.reset();
    window.location = "./index.html";
  } catch (error) {
    alert(error.message);
  }
}

async function onLogout() {
  try {
    const response = await fetch("http://localhost:3030/users/logout", {
      headers: {
        "X-Authorization": sessionStorage.getItem("accessToken"),
      },
    });
    if (response.status !== 204) {
      throw new Error(response.status);
    }
    sessionStorage.clear();
    window.location = "./index.html";
  } catch (error) {
    alert(error.message);
  }
}
