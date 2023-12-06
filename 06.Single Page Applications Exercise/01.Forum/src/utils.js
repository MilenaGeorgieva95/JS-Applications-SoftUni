export function formatAMPM(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  const strTime =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    ampm;
  return strTime;
}

export function e(type, attributes, ...content) {
  const result = document.createElement(type);
  for (let [attr, value] of Object.entries(attributes || {})) {
    if (attr.substring(0, 2) == "on") {
      result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
    } else {
      result.setAttribute(attr, value);
    }
  }
  content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
  content.forEach((e) => {
    if (typeof e == "string" || typeof e == "number") {
      const node = document.createTextNode(e);
      result.appendChild(node);
    } else {
      result.appendChild(e);
    }
  });
  return result;
}

export function createPostCard(post) {
  const result = e(
    "div",
    { class: "topic-container", "data-id": post._id },
    e(
      "div",
      { class: "topic-name-wrapper" },
      e(
        "div",
        { class: "topic-name" },
        e(
          "a",
          { class: "normal", href: "#" },
          e("h2", { class: "topic-name", "data-id": post._id }, post.title)
        ),
        e(
          "div",
          { class: "columns" },
          e(
            "div",
            {},
            e("p", {}, "Date: ", e("time", {}, post.date)),
            e(
              "div",
              { class: "nick-name" },
              e("p", {}, "Username: ", e("span", {}, post.username))
            )
          )
        )
      )
    )
  );

  return result;
}

export function createOneTopicView(topic) {
  const result = e(
    "div",
    { class: "comment", "data-topicId": topic.id },
    e(
      "div",
      { class: "header" },
      e("img", { src: "./static/profile.png", alt: "avatar" }),
      e(
        "p",
        {},
        e("span", {}, topic.username),
        " posted on ",
        e("time", {}, topic.time)
      ),
      e("p", { class: "post-content" }, topic.text)
    )
  );

  return result;
}

export function createOneComment(comment) {
  const result = e(
    "div",
    { id: "user-comment" },
    e(
      "div",
      { class: "topic-name-wrapper" },
      e(
        "div",
        { class: "topic-name" },
        e(
          "p",
          {},
          e("strong", {}, comment.username),
          " commented on ",
          e("time", {}, comment.date)
        ),
        e("div", { class: "post-content" }, e("p", {}, comment.commentText))
      )
    )
  );

  return result;
}

export function createTextArea() {
  const result = e(
    "div",
    { class: "container" },
    e(
      "main",
      { class: "topic-name-wrapper" },
      e(
        "div",
        {},
        e(
          "form",
          {},
          e(
            "div",
            { class: "new-topic-content" },
            e("textarea", {
              type: "text",
              name: "commentText",
              id: "commentText",
              rows: "8",
              cols: "60",
            })
          ),
          e(
            "div",
            { class: "new-topic-title" },
            e("label", { for: "username" }, "Username "),
            e("span", { class: "red" }, "*"),
            e("input", { type: "text", name: "username", id: "username" })
          ),
          e(
            "div",
            { class: "new-topic-buttons" },
            e("button", { class: "public" }, "Post")
          )
        )
      )
    )
  );

  return result;
}
