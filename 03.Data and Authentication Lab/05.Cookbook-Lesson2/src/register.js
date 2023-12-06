const form = document.querySelector("form");
form.addEventListener("submit", registerUser);

function registerUser(event) {
  event.preventDefault();
  //use form names
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  const repass = formData.get("rePass");

  if (!email || !password || !repass) {
    alert("Please complete all fields!");
    return;
  }

  if (password !== repass) {
    alert("Password and Repeated password do not match!");
    return;
  }

  const url = "http://localhost:3030/users/register";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("accessToken", data.accessToken);
      window.location.pathname = "d%3A/SoftUni/05.Cookbook-Lesson2/index.html";
    });
}
