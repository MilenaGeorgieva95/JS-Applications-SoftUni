import { createPostCard } from "./utils.js";
import { loadOneTopic } from "./loadTopic.js";
const main = document.querySelector("main");
const topicsSection = document.createElement("section");
topicsSection.id = "topics-section";
main.appendChild(topicsSection);

export async function loadTopics() {
  topicsSection.replaceChildren();
  const res = await fetch(
    "http://localhost:3030/jsonstore/collections/myboard/posts"
  );

  const data = await res.json();

  const dataArr = Object.values(data);
  const fragment = document.createDocumentFragment();
  console.log(dataArr);
  dataArr.forEach((el) => {
    const item = createPostCard(el);
    item.addEventListener("click", loadOneTopic);
    fragment.appendChild(item);
  });
  topicsSection.appendChild(fragment);
}
