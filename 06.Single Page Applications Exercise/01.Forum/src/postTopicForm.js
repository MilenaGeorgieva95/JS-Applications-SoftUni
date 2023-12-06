import { loadTopics } from "./loadTopicsPreview.js";
import { fetchPost } from "./fetchRequests.js";

export function postNewTopic() {
  const newTopicSection = document.querySelector(".new-topic-border");
  const newTopicForm = newTopicSection.querySelector("form");
  newTopicForm.addEventListener("submit", onPostTopic);
  const cancelBtn = newTopicForm.querySelector(".cancel");
  cancelBtn.addEventListener("click", onCancel);

  async function onPostTopic(event) {
    event.preventDefault();

    const formData = new FormData(newTopicForm);
    newTopicForm.reset();
    if ([...formData.values()].some((x) => x === "")) {
      alert("Input field is empty");
      return;
    }
    const date = new Date();
    const topic = {
      postText: formData.get("postText"),
      topicName: formData.get("topicName"),
      username: formData.get("username"),
      date: date.toISOString(),
    };
    const res = fetchPost(
      "http://localhost:3030/jsonstore/collections/myboard/posts",
      topic
    );
    if (res) {
      loadTopics();
    }
  }

  function onCancel(event) {
    event.preventDefault();
    newTopicForm.reset();
  }
}
