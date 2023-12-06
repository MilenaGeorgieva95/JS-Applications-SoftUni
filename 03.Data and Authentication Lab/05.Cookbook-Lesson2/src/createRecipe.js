const form = document.querySelector("form");
const createBtn = document.querySelector('form input[type="submit"]');
createBtn.addEventListener("click", onCreate);

function onCreate(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const recipeData = Object.fromEntries(formData);

  recipeData.ingredients = recipeData.ingredients.split("\n");
  recipeData.steps = recipeData.steps.split("\n");
  publishRecipe(recipeData);
}

function publishRecipe(recipe) {
  const url = "http://localhost:3030/data/recipes";
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(recipe),
  };

  fetch(url, options)
    .then((res) => {
      if (res.ok == false) {
        throw new Error("Error occurred! Could not save the recipe!");
      }
      window.location.pathname = "d%3A/SoftUni/05.Cookbook-Lesson2/index.html";
    })
    .catch((error) => alert(error));
}
