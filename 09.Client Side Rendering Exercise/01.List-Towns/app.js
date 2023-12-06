import { render, html } from "./node_modules/lit-html/lit-html.js";

const form = document.querySelector("form.content");
form.addEventListener("submit", loadTowns);

function loadTowns(e) {
  e.preventDefault();
  const townsData = getFormData(form);
  renderListItems(townsData);
}

const renderListItems = (data) => {
  const root = document.querySelector("#root");
  render(template(data), root);
};

const template = (data) => html` <ul>
  ${data.map(createLi)}
</ul>`;

const createLi = (town) => html`<li>${town}</li>`;

function getFormData(form) {
  const formData = new FormData(form);
  form.reset();
  return formData.get("towns").split(", ");
}
