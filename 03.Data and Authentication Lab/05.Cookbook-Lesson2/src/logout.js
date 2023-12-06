const logoutBtn = document.querySelector("#logoutBtn");
logoutBtn.addEventListener("click", onLogout);

async function onLogout() {
  const url = "http://localhost:3030/users/logout";
  const options = {
    method: "get",
    headers: {
      "X-Authorization": localStorage.getItem("accessToken"),
    },
  };
  fetch(url, options)
    .then((res) => {
      if (res.ok != true) {
        throw new Error("Error: Logout not successful!");
      }
      localStorage.clear();
      window.location.pathname = "d%3A/SoftUni/05.Cookbook-Lesson2/index.html";
    })
    .catch((error) => console.log(error));
}
