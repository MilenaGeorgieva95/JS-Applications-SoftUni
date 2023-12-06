import { hideAll } from "./hideAllSec.js";
import { showAddMovie } from "./addMovieSection.js";
import { showDetails } from "./detailsView.js";

export async function showHomeView() {
  hideAll();

  const homeSec = document.querySelector("#home-page");
  homeSec.style.display = "block";
  const addMovieSecBtn = document.querySelector("#add-movie-button");

  if (localStorage.getItem("accessToken") !== null) {
    addMovieSecBtn.style.display = "block";
    const addMovieBtn = addMovieSecBtn.querySelector("a");
    addMovieBtn.addEventListener("click", showAddMovie);
  } else {
    addMovieSecBtn.style.display = "none";
  }

  const moviesListUl = document.querySelector("ul#movies-list");
  let htmlMoviesHome = "";
  try {
    const res = await fetch("http://localhost:3030/data/movies");
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    const data = await res.json();

    for (let movie of data) {
      const movieCardTemplate = `
      <li class="card mb-4">
        <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
        <div class="card-body">
          <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-info" data-id="${movie._id}">Details</button></a>
        </div>
      </li>`;

      htmlMoviesHome += movieCardTemplate;
    }
    moviesListUl.innerHTML = htmlMoviesHome;
    const buttons = Array.from(moviesListUl.querySelectorAll("button"));

    buttons.forEach((btn) =>
      btn.addEventListener("click", (event) => showDetails("", event))
    );
  } catch (error) {
    alert(error.message);
    return;
  }
}
