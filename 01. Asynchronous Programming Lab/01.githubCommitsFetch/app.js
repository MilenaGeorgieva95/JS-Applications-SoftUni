function loadCommits() {
  const [username, repo] = [...document.querySelectorAll("input")];
  const commitsUl = document.querySelector("#commits");

  fetch(`https://api.github.com/repos/${username.value}/${repo.value}/commits`)
    .then((response) => {
      if (response.ok == true) {
        return response.json();
      }
      throw `Error: ${response.status} (${response.statusText})`;
    })
    .then((data) => {
      commitsUl.replaceChildren();
      for (let repository of data) {
        let newLi = document.createElement("li");
        newLi.textContent = `${repository.commit.author.name}: ${repository.commit.message}`;
        commitsUl.appendChild(newLi);
      }
    })
    .catch((error) => {
      commitsUl.replaceChildren();
      let newLi = document.createElement("li");
      newLi.textContent = error;
      commitsUl.appendChild(newLi);
    });
}
