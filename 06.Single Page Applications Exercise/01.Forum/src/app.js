import { postNewTopic } from "./postTopicForm.js";
import { loadTopics } from "./loadTopicsPreview.js";

postNewTopic();
loadTopics();

const homeBtn = document.querySelector("li>a");
homeBtn.addEventListener("click", onHome);

function onHome(event) {
  event.preventDefault();
  window.location = "./index.html";
}
