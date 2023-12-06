function loadRepos() {
  const username = document.querySelector("#username");
  const reposUl = document.querySelector("#repos");

  const url = `https://api.github.com/users/${username.value}/repos`;

  createRepos();

  async function createRepos() {
    try {
      const response = await fetch(url);
      if (response.ok == false) {
        const error = await response.json();
        throw `${response.status} ${error.message}`;
      }
      const data = await response.json();
      reposUl.replaceChildren();
      for (let line of data) {
        let repoLi = document.createElement("li");
        repoLi.textContent = `${line.full_name} ${line.html_url}`;
        reposUl.appendChild(repoLi);
      }
    } catch (error) {
      reposUl.replaceChildren();
      let errorLi = document.createElement("li");
      errorLi.textContent = error;
      reposUl.appendChild(errorLi);
    }
  }
}
