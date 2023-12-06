//load the recipes previews
window.addEventListener("load", async () => {
  const main = document.querySelector("main");

  const recipes = await getRecipes();
  const cards = recipes.map(createRecipePreview);

  main.innerHTML = "";
  cards.forEach((card) => main.appendChild(card));
});

async function getRecipes() {
  const response = await fetch(
    "http://localhost:3030/jsonstore/cookbook/recipes"
  );
  const recipes = await response.json();

  return Object.values(recipes);
}

function createRecipeCard(recipe) {
  const text = `
  <h2>${recipe.name}</h2>
  <div class="band">
    <div class="thumb">
        <img src="${recipe.img}" alt="">
    </div>
    <div class="ingredients">
        <h3>Ingredients:</h3>
        <ul class="ingredients-ul"></ul>
    </div>
  </div>
  <div class="description">
      <h3>Preparation:</h3>
  </div>`;

  const article = document.createElement("article");
  article.innerHTML = text;

  recipe.ingredients.forEach((ingredient) => {
    const newLi = document.createElement("li");
    newLi.textContent = ingredient;
    const ingredientsUl = article.querySelector(".ingredients-ul");
    ingredientsUl.appendChild(newLi);
  });

  recipe.steps.forEach((step) => {
    const newP = document.createElement("p");
    newP.textContent = step;
    const descriptionSec = article.querySelector(".description");
    descriptionSec.appendChild(newP);
  });

  return article;
}

//replace preview with full recipe
function createRecipePreview(recipe) {
  const text = `
<div class="title">
  <h2>${recipe.name}</h2>
</div>
<div class="small">
  <img src="${recipe.img}" alt="">
</div>`;

  const article = document.createElement("article");
  article.classList.add("preview");
  article.addEventListener("click", showMore);
  article.innerHTML = text;

  return article;

  async function showMore() {
    const fullRecipe = await getRecipeById(recipe._id);

    article.replaceWith(createRecipeCard(fullRecipe));
  }
}

//fetch details data for one recipe
async function getRecipeById(id) {
  const response = await fetch(
    "http://localhost:3030/jsonstore/cookbook/details/" + id
  );
  const recipe = await response.json();

  return recipe;
}
