import { showDetails } from "./detailsView.js";
import { hideAll } from "./hideAllSec.js";
import { showHomeView } from "./home.js";

const editMovieSec = document.querySelector("#edit-movie");
const editForm = editMovieSec.querySelector("form");
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitEdit(movieId);
});
let movieId = "";
export async function onEdit(e) {
  e.preventDefault();
  movieId = e.target.dataset.id;
  hideAll();
  editMovieSec.style.display = "block";
  const res = await fetch(`http://localhost:3030/data/movies/${movieId}`);
  const data = await res.json();

  const title = editForm.querySelector("input#title");
  const img = editForm.querySelector("input#imageUrl");
  const description = editForm.querySelector("textarea");
  title.value = data.title;
  img.value = data.img;
  description.value = data.description;
}

async function submitEdit(movieId) {
  const formData = new FormData(editForm);
  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("img");

  try {
    const res = await fetch(`http://localhost:3030/data/movies/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ title, description, img }),
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    showDetails(movieId);
  } catch (error) {
    alert(error.message);
  }
}

export async function onDelete(movieId) {
  try {
    const res = await fetch(`http://localhost:3030/data/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": localStorage.getItem("accessToken"),
      },
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    showHomeView();
  } catch (error) {
    alert(error.message);
  }
}
