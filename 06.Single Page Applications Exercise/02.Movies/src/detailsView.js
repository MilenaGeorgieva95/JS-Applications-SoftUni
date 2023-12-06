import { hideAll } from "./hideAllSec.js";
import {
  likeMovie,
  dislikeMovie,
  counterLikes,
  isMovieLiked,
} from "./likes.js";
import { onEdit, onDelete } from "./EditDelete.js";

export async function showDetails(idM, event) {
  let id = "";
  if (idM) {
    id = idM;
  } else {
    const button = event.target;
    id = button.dataset.id;
  }

  const userId = localStorage.getItem("id");
  hideAll();
  try {
    const response = await fetch(`http://localhost:3030/data/movies/${id}`);
    if (response.ok == false) {
      throw new Error(response.message);
    }
    const data = await response.json();
    const isLiked = await isMovieLiked(id, userId);
    const totalLikes = await counterLikes(id);

    const movieDetailsTemplate = `
            <div class="container">
              <div class="row bg-light text-dark">
                <h1>Movie title: ${data.title}</h1>
  
                <div class="col-md-8">
                  <img class="img-thumbnail" src="${data.img}" alt="Movie" />
                </div>
  
                <div class="col-md-4 text-center">
                  <h3 class="my-3">Movie Description</h3>
                  <p>
                    ${data.description}
                  </p>
                  <a class="btn btn-danger" href="#" data-id="${data._id}" data-owner="${data._ownerId}">Delete</a>
                  <a class="btn btn-warning" href="#" data-id="${data._id}" data-owner="${data._ownerId}">Edit</a>
                  <a class="btn btn-primary" href="#" data-id="${data._id}" data-owner="${data._ownerId}">Like</a>
                  <span class="enrolled-span">Liked ${totalLikes}</span>
                </div>
              </div>
            </div>
      `;

    const movieSection = document.querySelector("#movie-example");
    movieSection.innerHTML = movieDetailsTemplate;
    movieSection.style.display = "block";

    const buttons = Array.from(movieSection.querySelectorAll("a"));
    const deleteBtn = buttons[0];
    const editBtn = buttons[1];
    const likeBtn = buttons[2];
    deleteBtn.style.visibility = "hidden";
    editBtn.style.visibility = "hidden";
    likeBtn.style.visibility = "hidden";
    likeBtn.dataset.id = id;

    if (userId !== null && data._ownerId === userId) {
      deleteBtn.style.visibility = "visible";
      deleteBtn.className = "btn btn-danger";
      editBtn.style.visibility = "visible";
      editBtn.className = "btn btn-warning";
      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        onDelete(id);
      });
      editBtn.addEventListener("click", onEdit);
    }

    if (userId !== null && data._ownerId !== userId) {
      likeBtn.style.visibility = "visible";
      if (isLiked.length > 0 && isLiked.length) {
        likeBtn.textContent = "Dislike";
        likeBtn.className = "btn btn-success";
        likeBtn.addEventListener("click", async () =>
          dislikeMovie(data._id, isLiked[0]._id)
        );
      } else {
        likeBtn.textContent = "Like";
        likeBtn.className = "btn btn-primary";
        likeBtn.addEventListener("click", () => likeMovie(data._id));
      }
    }
  } catch (error) {
    alert(error.message);
  }
}
