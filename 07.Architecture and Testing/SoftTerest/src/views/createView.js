import { createIdea } from "../api/data.js";

const createSec = document.querySelector("#create");
const createForm = createSec.querySelector("form");
createForm.addEventListener("submit", onCreate);

let context = null;

export function showCreate(ctx) {
  context = ctx;
  context.render(createSec);
  context.updateNav();
}

async function onCreate(e) {
  e.preventDefault();
  const formData = new FormData(createForm);
  createForm.reset();
  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("imageURL");
  if (title.length < 6 || description.length < 10 || img.length < 5) {
    alert("Invalid information!");
    return;
  }

  try {
    await createIdea(title, description, img);
  } catch (error) {
    console.log(error);
    return;
  }
  context.updateNav()
  context.goTo("/dashboard");
}
