async function loadCommits() {
  const [username, repo] = [...document.querySelectorAll("input")];
  const commitsUl = document.querySelector("#commits");
  const url = `https://api.github.com/repos/${username.value}/${repo.value}/commits`;

  try {
    const response = await fetch(url);
    if (response.ok == false) {
      const errorData = await response.json();
      throw `${response.status}: ${errorData.message} <a href="${errorData.documentation_url}">More Information</a>`;
    }

    const data = await response.json();
    commitsUl.replaceChildren();
    for (let repository of data) {
      let newLi = document.createElement("li");
      newLi.textContent = `${repository.commit.author.name}: ${repository.commit.message}`;
      commitsUl.appendChild(newLi);
    }
  } catch (error) {
    commitsUl.innerHTML = `<p>${error}</p>`;
  }
}
