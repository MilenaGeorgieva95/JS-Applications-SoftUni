async function solution() {
  const main = document.querySelector("#main");
  const listUri = "http://localhost:3030/jsonstore/advanced/articles/list";
  const detailsUri =
    "http://localhost:3030/jsonstore/advanced/articles/details/";

  (async function displayTitles() {
    let promisesList = [];
    const response = await fetch(listUri);
    const data = await response.json();
    data.forEach((el) => {
      promisesList.push(getDetails(el._id));
    });
    Promise.all(promisesList).then((result) =>
      result.forEach((el) => createCards(el._id, el.title, el.content))
    );
  })();

  async function getDetails(id) {
    const response = await fetch(detailsUri + id);
    const data = await response.json();
    return data;
  }

  function onMore(event) {
    const parentDiv = event.target.parentElement.parentElement;
    const hiddenSec = parentDiv.querySelector(".extra");
    hiddenSec.style.display = "block";
    const lessBtn = event.target;
    lessBtn.textContent = "Less";
    lessBtn.removeEventListener("click", onMore);
    lessBtn.addEventListener("click", onLess);
  }

  function onLess(event) {
    const parentDiv = event.target.parentElement.parentElement;
    const hiddenSec = parentDiv.querySelector(".extra");
    hiddenSec.style.display = "none";
    const moreBtn = event.target;
    moreBtn.textContent = "More";
    moreBtn.removeEventListener("click", onLess);
    moreBtn.addEventListener("click", onMore);
  }

  function createCards(id, title, content) {
    const text = `
    <div class="head">
        <span>${title}</span>
        <button class="button" id="${id}">More</button>
    </div>
    <div class="extra">
        <p>${content}</p>
    </div>`;
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("accordion");
    titleDiv.innerHTML = text;
    const moreBtn = titleDiv.querySelector("button");
    moreBtn.addEventListener("click", onMore);
    main.appendChild(titleDiv);
  }
}

solution();
