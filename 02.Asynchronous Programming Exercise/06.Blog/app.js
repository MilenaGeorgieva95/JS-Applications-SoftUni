function attachEvents() {
  const postsUri = "http://localhost:3030/jsonstore/blog/posts/";
  const commentsUri = "http://localhost:3030/jsonstore/blog/comments";
  const loadPostsBtn = document.querySelector("#btnLoadPosts");
  const selectPosts = document.querySelector("#posts");
  const viewBtn = document.querySelector("#btnViewPost");
  const postTitle = document.querySelector("#post-title");
  const postBody = document.querySelector("#post-body");
  const commentsUl = document.querySelector("#post-comments");
  loadPostsBtn.addEventListener("click", onLoadPosts);
  viewBtn.addEventListener("click", onView);

  async function onLoadPosts() {
    selectPosts.replaceChildren();
    const response = await fetch(postsUri);
    const data = await response.json();
    Object.values(data).forEach((el) => {
      createOption(el.id, el.title);
    });
  }

  async function onView() {
    const id = selectPosts.value;

    const res = await fetch(postsUri + id);
    const postData = await res.json();
    postTitle.textContent = postData.title;
    postBody.textContent = postData.body;

    commentsUl.replaceChildren();
    const response = await fetch(commentsUri);
    const data = await response.json();
    let matches = Object.values(data).filter((el) => el.postId === id);
    matches.forEach((el) => {
      createComment(el.id, el.text);
    });
  }

  function createOption(id, title) {
    let option = document.createElement("option");
    option.value = id;
    option.textContent = title;
    selectPosts.appendChild(option);
  }

  function createComment(id, text) {
    let li = document.createElement("li");
    li.id = id;
    li.textContent = text;
    commentsUl.appendChild(li);
  }
}

attachEvents();
