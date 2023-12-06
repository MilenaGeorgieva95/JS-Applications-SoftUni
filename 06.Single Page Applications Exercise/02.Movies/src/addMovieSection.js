import { hideAll } from "./hideAllSec.js";
import { showHomeView } from "./home.js";

export function showAddMovie(e) {
  e.preventDefault();
  hideAll();
  const addMovieSec = document.querySelector("#add-movie");
  addMovieSec.style.display = "block";
  const addMovieForm = document.querySelector("#add-movie-form");
  addMovieForm.addEventListener("submit", addNewMovie);
}

async function addNewMovie(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  form.reset();
  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("img");

  if (!title || !description || !img) {
    alert("Missing required fields!");
    return;
  }
  try {
    const res = await fetch("http://localhost:3030/data/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ title, description, img }),
    });

    if (res.status !== 200) {
      throw new Error("Unable to add movie: " + res.status);
    }
    showHomeView();
  } catch (error) {
    alert(error.message);
  }
}
