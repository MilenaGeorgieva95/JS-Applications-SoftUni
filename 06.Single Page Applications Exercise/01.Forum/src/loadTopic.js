import { fetchGet, fetchPost } from "./fetchRequests.js";
import { createOneTopicView } from "./utils.js";
import { formatAMPM } from "./utils.js";
import { createOneComment } from "./utils.js";

import { createTextArea } from "./utils.js";

const main = document.querySelector("main");

export async function loadOneTopic(event) {
  const topic = event.currentTarget;
  const topicTitleH2 = topic.querySelector("h2.topic-name");
  main.replaceChildren(topicTitleH2);
  const id = event.currentTarget.dataset.id;

  const topicDetails = await fetchGet(
    "http://localhost:3030/jsonstore/collections/myboard/posts" + "/" + id
  );
  if (topicDetails) {
    const date = new Date(topicDetails.date);
    let dateTime = formatAMPM(date);
    const topicObj = {
      id: topicDetails._id,
      text: topicDetails.postText,
      username: topicDetails.username,
      time: dateTime,
    };

    const topicView = createOneTopicView(topicObj);
    main.appendChild(topicView);
  }

  const sec = document.querySelector(".comment");
  try {
    const response = await fetch(
      "http://localhost:3030/jsonstore/collections/myboard/comments"
    );
    if (response.ok === false) {
      throw new Error("error");
    }
    if (response.status === 200) {
      const allComments = await response.json();
      const topicId = id;
      const fragment = document.createDocumentFragment("div");
      for (let comment of Object.values(allComments)) {
        console.log(comment);
        if (topicId === comment._topicId) {
          const newComment = createOneComment(comment);
          console.log(newComment);

          fragment.appendChild(newComment);
        }
      }
      sec.appendChild(fragment);
    }
    if (response.status === 204) {
      console.log("No comments yet");
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    const body = document.querySelector("body");
    const footer = document.querySelector("footer");
    const newP = createTextArea();
    body.insertBefore(newP, footer);
    const form = body.querySelector("form");
    form.addEventListener("submit", onPostComment);
  }
}

async function onPostComment(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  console.log(Object.fromEntries(formData));

  event.currentTarget.reset();
  if ([...formData.values()].some((x) => x === "")) {
    alert("Input field is empty");
    return;
  }
  const topicH2 = document.querySelector("h2.topic-name");
  const topicId = topicH2.dataset.id;
  console.log(topicId);
  const date = new Date();
  const dateTime = formatAMPM(date);
  const comment = {
    commentText: formData.get("commentText"),
    _topicId: topicId,
    username: formData.get("username"),
    date: dateTime,
  };
  console.log(comment);
  const res = fetchPost(
    "http://localhost:3030/jsonstore/collections/myboard/comments",
    comment
  );

  if (res) {
    const commentsSec = document.querySelector("div.comment");
    console.log("yess");
    const newComment = createOneComment(comment);
    console.log(newComment);
    commentsSec.appendChild(newComment);
  }
}
