import { showDetails } from "./detailsView.js";

export async function likeMovie(id) {
  await fetch(`http://localhost:3030/data/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({ movieId: id }),
  });
  showDetails(id);
}

export async function dislikeMovie(movieId, likeId) {
  const res = await fetch(`http://localhost:3030/data/likes/${likeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("accessToken"),
    },
  });
  showDetails(movieId);
}

export async function isMovieLiked(movieId, userId) {
  const token = localStorage.getItem("accessToken");

  if (token) {
    const response = await fetch(
      `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      }
    );

    return response.json();
  }
}

export async function counterLikes(movieId) {
  const response = await fetch(
    `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = response.json();
  return data;
}
