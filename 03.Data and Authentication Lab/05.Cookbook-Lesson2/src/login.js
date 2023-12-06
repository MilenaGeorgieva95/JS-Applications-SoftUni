const loginBtn = document.querySelector('input[type="submit"');
loginBtn.addEventListener("click", onLogin);

function onLogin(event) {
  event.preventDefault();
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const loginData = Object.fromEntries(formData);
  loginUser(loginData);
}

async function loginUser(loginData) {
  const url = "http://localhost:3030/users/login";
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  fetch(url, options)
    .then((res) => {
      if (res.ok == false) {
        throw new Error("Unable to login");
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("accessToken", data.accessToken);
      window.location.pathname = "d%3A/SoftUni/05.Cookbook-Lesson2/index.html";
    })
    .catch((error) => alert(error));
}
